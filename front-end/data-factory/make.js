const http = require('http')
const home = require('./home.json')

http.createServer(function (request, response) {
  console.log('request come', request.url)
  response.writeHead(200, {
    'Access-Control-Allow-Origin': 'http://localhost:8080',
    'Access-Control-Allow-Headers': 'X-Test-Cors, Content-Type',
    'Access-Control-Allow-Methods': 'POST, PUT, DELETE, GET',
    'Access-Control-Max-Age': '1000',
    // 'Content-Type': 'application/x-www-form-urlencoded'
  })
  response.end(JSON.stringify(home))
}).listen(5656)

console.log('http://127.0.0.1:5656');
