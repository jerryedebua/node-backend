let fs = require('fs')
let path = require('path')

let mimeTypes = require('./mime-types.json')

function handler() {
  let filePath = '.' + this.request.url
  if (filePath == './') {
    filePath = './pages/index.html'
  }

  let extname = String(path.extname(filePath)).toLowerCase()
  let contentType = mimeTypes[extname] || 'application/octet-stream'

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        this.response.statusCode = 404
        this.response.setHeader('Content-Type', 'text/plain')
        this.response.end('Not implemented', 'utf-8')
      } else {
        this.response.statusCode = 500
        this.response.setHeader('Content-Type', 'text/plain')
        this.response.end(
          'Sorry, check with site admin for error, ' + error.code + '\n'
        )
      }
    } else {
      this.response.statusCode = 200
      this.response.setHeader('Content-Type', contentType)
      this.response.end(content, 'utf-8')
    }
  })
}

module.exports = handler
