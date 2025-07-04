import express from 'express';
import {join} from 'node:path';

const mainServerApp = express();
const port = 8080;  

//server setup
// Serve static files from the Assests directory - files will be available at root level
mainServerApp.use(express.static(join(process.cwd(), 'src', 'StaticFiles','Assests')));

// Alternative: serve with a specific mount path to match your URL structure
mainServerApp.use('/src/Assests', express.static(join(process.cwd(), 'src', 'StaticFiles','Assests')));
mainServerApp.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); 
});

// Define a route for the root URL
mainServerApp.get('/basichtml', (req, res) => {
  console.log('Received a request at /basichtml');
  //res.status(200).sendFile('./src/StaticFiles/basic.html'); ===>  //sendFile does not take '/' for root path

  const htmlFilePath = join(process.cwd(), 'src', 'StaticFiles', 'basic.html'); // Use path.join to construct the file path correctly  
  console.log(`HTML file path: ${htmlFilePath}`);
  //console.log(__dirname); // this is not going to work in ES6 modules,  it's only available in CommonJS modules.

  res.status(200).sendFile(`${process.cwd()}/src/StaticFiles/basic.html`); // Use process.cwd() to get the current working directory  
}); 

// Define a route for the root URL
mainServerApp.get('/basicstyles', (req, res) => {
  console.log('Received a request at /basicstyles');

  const htmlFilePath = join(process.cwd(), 'src', 'StaticFiles', 'basicStyles.html'); // Use path.join to construct the file path correctly  

  res.status(200).set({'Content-type':'text/html'}).sendFile(`${process.cwd()}/src/StaticFiles/basicstyles.html`); // if you want to set the header in response.
}); 