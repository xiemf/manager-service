module.exports = function (req, res, next) {
  if (req.query.offset) {
    req.query.offset = parseInt(req.query.offset)
  }
  if (req.query.limit) {
    req.query.limit = parseInt(req.query.limit)
  }
  next()
}