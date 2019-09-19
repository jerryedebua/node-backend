var http = require('http');

var handler = require('./request-handler');
var port = 8000;

http.createServer(handler).listen(port);
console.info(`Server at http://127.0.0.1:${port}/`);