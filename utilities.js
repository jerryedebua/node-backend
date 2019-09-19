var url = require('url');

module.exports = {

  getPresetRequest: function (req) {
    var parsedUrl = url.parse(req.url).pathname;
    return require('./routes').find(route => (
      route.url === parsedUrl &&
      (
        route.method.toUpperCase() === req.method ||
        req.method === 'OPTIONS'
      )
    ));
  },

  getRequestToken: function (req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  }

}