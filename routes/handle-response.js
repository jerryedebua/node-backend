module.exports = async function (request) {
  try {
    const data = await request()
    this.sendResponse.call(this, JSON.stringify(data))
  } catch (error) {
    console.error(error) // eslint-disable-line
    this.sendResponse.call(
      this,
      'Check data server for error, ' + error.code + '\n',
      500,
      { 'Content-Type': 'text/plain' }
    )
  }
}
