import express from 'express';
const server = express();
const port = 8080;  

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); 
});
server.get('/', (req, res) => {
  res.status(200).send('Hello World!');
}); 