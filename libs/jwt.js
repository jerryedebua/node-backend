let jwt = require('jsonwebtoken')

let secret = 'secret1-@!'
let expiresIn = '6h'

exports.createToken = function (payload) {
  return jwt.sign(payload, secret, { expiresIn })
}

exports.verifyToken = function (token) {
  return jwt.verify(token, secret)
}
