var handleResponse = require('./handle-response');
var { createToken } = require('../libs/jwt');

module.exports = [
  {
    url: '/user/signin',
    method: 'post',
    callback: function (req, res) {

      handleResponse(new Promise(resolve => {

        setTimeout(function () {
          resolve(JSON.stringify({
            name: 'User 1',
            token: createToken({ id: 1 })
          }));
        }, 1000);

      }), req, res);

    },
    isPublic: true
  }
]