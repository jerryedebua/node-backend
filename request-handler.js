var utils = require('./utilities');
var jwt = require('./libs/jwt');

var checkFile = require('./file-handler');

function handler(request, response) {

  (function () {

    this.handleCors();

    if (request.method == 'OPTIONS') {
      response.end();
      return null;
    }

    var presetRequest = this.getPresetRequest();

    if (presetRequest) {

      /* Execute route callbacks after request data is processed */
      var data = [];
      request.on('data', chunk => data.push(chunk));

      request.on('end', () => {

        if (data.length) request.body = JSON.parse(data);

        const callback = presetRequest.callback.bind(this);

        if (presetRequest.isPublic) callback(request, response);
        else try {

          var token = this.getRequestToken();
          request.user = jwt.verifyToken(token);

          callback(request, response);

        } catch (error) {

          this.sendResponse(
            'Authorization failed, ' + error.message,
            401,
            { 'Content-Type': 'text/plain' }
          );

        }

      });

    } else checkFile.bind(this)();

  }).bind({ request, response, ...utils })()

}

module.exports = handler;
