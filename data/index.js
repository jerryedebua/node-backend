module.exports = {

  getData: function () {
    return new Promise(function (resolve, reject) {
      connectToData().then(function (connection) {

        var testData = [];

        resolve(connection.query(testData));

      }).catch(function (error) {
        console.error(error);
      })
    });
  }

};

var query = function (data) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(data);
    }, 1000);
  });
};

var connectToData = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve({ query });
  }, 800);
});