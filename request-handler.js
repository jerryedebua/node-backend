var fs = require('fs');
var path = require('path');

var utils = require('./utilities');
var jwt = require('./libs/jwt');

module.exports = function (request, response) {

  handleCors(response);

  var presetRequest = utils.getPresetRequest(request);
  var isPresetRequest = Boolean(presetRequest);

  if (isPresetRequest) {

    if (request.method === 'OPTIONS') {
      response.end();
      return;
    }

    /* Execute route callbacks after request data is processed */
    var data = [];
    request.on('data', chunk => data.push(chunk));
    request.on('end', () => {
      
      if (data.length) request.body = JSON.parse(data);

      if (presetRequest.isPublic) presetRequest.callback(request, response);
      else try {
        
        var token = utils.getRequestToken(request);
        
        request.user = jwt.verifyToken(token);
        presetRequest.callback(request, response);
      
      } catch (error) {
        
        response.statusCode = 401;
        response.setHeader('Content-Type', 'text/plain');
        response.end('Authorization failed, ' + error.message, 'utf-8');
      
      }
      
    });

    return;

  }

  checkFilePaths(request, response);

}

function checkFilePaths(request, response) {
  var filePath = '.' + request.url;
  if (filePath == './') {
    filePath = './pages/index.html';
  }

  var extname = String(path.extname(filePath)).toLowerCase();
  var mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml',
    '.wasm': 'application/wasm'
  };

  var contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code == 'ENOENT') {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/plain');
        response.end('Not implemented', 'utf-8');
      } else {
        response.statusCode = 500;
        response.setHeader('Content-Type', 'text/plain');
        response.end('Sorry, check with site admin for error, ' + error.code + '\n');
      }
    } else {
      response.statusCode = 200;
      response.setHeader('Content-Type', contentType);
      response.end(content, 'utf-8');
    }
  });
}

function handleCors(response) {
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, *');
  // response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Origin', '*');
}