module.exports = function (promise, req, res) {
  promise.then(function (data) {
    onDataRequestReturned(res, data);
  }).catch(function (error) {
    onDataRequestError(res, error);
  })
};

function onDataRequestReturned(response, data) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(data, 'utf-8');
}

function onDataRequestError(response, error) {
  console.error(error);
  response.statusCode = 500;
  response.end('Check Data server for error, ' + error.code + '\n');
}