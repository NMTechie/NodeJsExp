import expres, { response } from 'express';
import { join } from 'node:path';
import cookieParser from 'cookie-parser';
import { Console } from 'node:console';

const mainServerApp = expres();
const port = 8080;

//server setup    
mainServerApp.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); 
});
// Middleware to parse cookies
mainServerApp.use(cookieParser());
// Serve static files from the Assests directory - files will be available at root level
mainServerApp.use(expres.static(join(process.cwd(), 'src', 'Mvc','Assests')));

//creating my custom middleware
mainServerApp.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  req.AddCustomProp='Custom Property Added'; // Adding a custom property to the request object
  next(); // Call the next middleware in the stack
});

// Global error handling middleware
mainServerApp.use((err, req, res, next) => {
  console.error('An error occurred:', err.message);
  res.status(500).send('Internal Server Error');  
  // not calling next() here, as this is the end of the middleware chain for errors
});

// Configure EJS as the view engine
mainServerApp.set('view engine', 'ejs');
// Set the views directory for EJS templates
mainServerApp.set('views', join(process.cwd(), 'src', 'Mvc', 'Views'));


// Define a route for the root URL
mainServerApp.get('/mvcEJS', (req, res) => {
  console.log('Received a request at /mvcEJS');
  
  const htmlFilePath = join(process.cwd(), 'src', 'Mvc','Views', 'template.html'); // Use path.join to construct the file path correctly  
  console.log(`HTML file path: ${htmlFilePath}`);
  
  res.status(200).sendFile(htmlFilePath); // Use process.cwd() to get the current working directory  
});


// Define a route for ejs view rendering
mainServerApp.get('/mvcEJS/View/:red_id', (req, res) => {
  console.log('Received a request at /mvcEJS where route parameter red_id:', req.params.red_id);
    const id = parseInt(req.params.red_id, 10); // Convert the route parameter to an integer
    const lookupData = getLookUpData(id); // Get the lookup data based on the id
    if (!lookupData) {
      return res.status(404).send('Data not found for the given ID');
    }
    res.status(200).render('ejstemplateView', lookupData);
  //res.status(200).render('ejstemplateView', { title: 'EJS Template', message: 'Hello from EJS!' }); // Render the EJS template with data   
});

// Define a route for POST request handling
mainServerApp.post('/mvcEJS/View/post', (req, res) => {
  console.log('Received a POST request at /mvcEJS/View/post');  
  
  // Here you can handle the POST request data
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString(); // Convert Buffer to string
  });
  req.on('end', () => {
    console.log('POST data received:', body);
    const parsedData = JSON.parse(body); // Assuming the body is JSON formatted
    let id = parsedData.id; // Extract the id from the parsed data
    let message = parsedData.message; // Extract the message from the parsed data
    console.log(`ID: ${id}, Message: ${message}`);

    let myCookie;
    if(req.cookies.myCookie === undefined) {
      myCookie = [];
    } 
    else {  
      myCookie = JSON.parse(req.cookies.myCookie);
    } 

    myCookie.push({id: id, message: message}); // Add the new data to the cookie array
    res.cookie('myCookie', JSON.stringify(myCookie), { maxAge: 900000, httpOnly: true });
    console.log('Cookie set:', JSON.stringify(myCookie));

    // You can parse the body if needed, e.g., using querystring or JSON.parse
    res.status(200).json({responseKey:"POST request received successfully"});
  });


});


// Define route specific middleware
const routeSpecificMiddleware = function (req, res, next)  {
  console.log('This is a route-specific middleware created for route /mvcEJS/testMiddleware and it will be executed before the route handler.');
  next(); // Call the next middleware or route handler
};

mainServerApp.get('/mvcEJS/testMiddleware',routeSpecificMiddleware, (req, res) => {
console.log(`My Custom Property: ${req.AddCustomProp}`); // Accessing the custom property added by the middleware
  res.status(200).send(`My Custom Property: ${req.AddCustomProp}`);
});



const ejsData = { 'LookupData':
    [
  { "id": 1, "message": "Alpha" },
  { "id": 2, "message": "Bravo" },
  { "id": 3, "message": "Charlie" },
  { "id": 4, "valmessageue": "Delta" },
  { "id": 5, "message": "Echo" },
  { "id": 6, "message": "Foxtrot" },
  { "id": 7, "message": "Golf" },
  { "id": 8, "message": "Hotel" },
  { "id": 9, "message": "India" },
  { "id": 10, "message": "Juliet" }
]
}

function getLookUpData(id) {
  return ejsData.LookupData.find(item => item.id === id);
};