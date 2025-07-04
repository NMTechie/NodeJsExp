// This simple node.js script creates a basic HTTP server that listens on port 8080 and responds with "Hello World!" when accessed.
let http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);


