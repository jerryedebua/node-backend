var jwt = require('jsonwebtoken');

var secret = 'secret1-@!';
var expiresIn = '6h';

exports.createToken = function (payload) {
  return jwt.sign(payload, secret, { expiresIn });
};

exports.verifyToken = function (token) {
  return jwt.verify(token, secret);
};
