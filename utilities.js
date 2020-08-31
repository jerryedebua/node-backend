var url = require('url');

module.exports = {

  handleCors: function () {
    this.response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    this.response.setHeader('Access-Control-Allow-Origin', '*'); // Specify your origins
  },

  getPresetRequest: function () {
    var parsedUrl = url.parse(this.request.url).pathname;
    return require('./routes').find(route => (
      route.url === parsedUrl &&
      route.method.toUpperCase() === this.request.method
    ));
  },

  getRequestToken: function () {
    if (
      this.request.headers.authorization &&
      this.request.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return this.request.headers.authorization.split(' ')[1];
    }
    return null;
  },

  sendResponse: function (data, statusCode = 200, headers = { 'Content-Type': 'application/json' }) {
    Object.keys(headers).forEach(function (header) {
      this.response.setHeader(header, headers[header]);
    });
    this.response.statusCode = statusCode;
    this.response.end(data, 'utf-8');
  }

}