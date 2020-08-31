let http = require('http')

let handler = require('./request-handler')
let port = 8000

http.createServer(handler).listen(port)
console.info(`Server at http://127.0.0.1:${port}/`) // eslint-disable-line
