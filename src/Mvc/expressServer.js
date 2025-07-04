import expres from 'express';
import { join } from 'node:path';

const mainServerApp = expres();
const port = 8080;

//server setup    
mainServerApp.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); 
});
// Serve static files from the Assests directory - files will be available at root level
mainServerApp.use(expres.static(join(process.cwd(), 'src', 'Mvc','Assests')));
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