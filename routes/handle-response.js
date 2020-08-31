module.exports = async function (request) {
  try {
    const data = await request()
    this.sendResponse(JSON.stringify(data))
  } catch (error) {
    console.error(error) // eslint-disable-line
    this.sendResponse(
      'Check data server for error, ' + error.code + '\n',
      500,
      { 'Content-Type': 'text/plain' }
    )
  }
}
