const express = require('express');
const app = express();
const http = require('http');

const hostname = 'localhost';
const port = 8000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});