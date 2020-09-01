const result = require('dotenv').config()
if (result.error) throw result.error

// Initiate redis connection
require('./redis')

const http = require('http')
const port = process.env.SERVER_PORT

const handler = require('./request-handler')

http.createServer(handler).listen(port)

console.info(`Server at localhost:${port}/`) // eslint-disable-line
