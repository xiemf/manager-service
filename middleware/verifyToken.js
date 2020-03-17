const ignorePath = ['/users/login']
const { createResult } = require('../util/createResult')
const { privateKey } = require('../config/jwt')
const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
  if (ignorePath.includes(req.path)) {
    next()
  } else {
    let token = req.get('SUNNY-TOKEN')
    jwt.verify(token, privateKey, (err, decode) => {
      if (err) {
        res.status(401)
        if ((err.name = 'JsonWebTokenError')) {
          res.send(createResult(err, 109, '用户未登录'))
        } else {
          res.send(createResult(err, 110, '登录已过期'))
        }
      } else {
        next()
      }
    })
  }
}
