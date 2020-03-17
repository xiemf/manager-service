module.exports.createResult = (data, code = 101, message = '') => {
  return {
    code,
    data,
    message
  }
}
