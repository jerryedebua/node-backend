module.exports = {
  getData: function () {
    return new Promise(function (resolve, reject) {
      connectToData()
        .then(function (connection) {
          let testData = []

          resolve(connection.query(testData))
        })
        .catch(function (error) {
          console.error(error) // eslint-disable-line
        })
    })
  }
}

let query = function (data) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(data)
    }, 1000)
  })
}

const connectToData = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve({ query })
  }, 800)
})
