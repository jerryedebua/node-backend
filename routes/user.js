var handleResponse = require('./handle-response');
var { createToken } = require('../libs/jwt');

module.exports = [
  {
    url: '/user/signin',
    method: 'post',
    callback: function (req, res) {

      handleResponse.bind(this)(async function () {
        // Make data request or write logic here
        return {
          name: 'User 1',
          token: createToken({ id: 1 })
        };
      }, req, res);

    },
    isPublic: true
  }
]