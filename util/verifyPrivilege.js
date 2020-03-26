const { createResult } = require('./index')
const UserService = require('../api/UserService')
const { privateKey } = require('../config/jwt')
const jwt = require('jsonwebtoken')
module.exports = function (code, req, res) {
  return new Promise((resolve, reject) => {
    let token = req.get('SUNNY-TOKEN')
    jwt.verify(token, privateKey, (err, decode) => {
      let userId = decode.userId
      UserService.userPrivilege(userId).then(privileges => {
        let privilegesCode = privileges.map(v => v.code)
        if (privilegesCode.includes(code)) {
          resolve()
        } else {
          res.status(403).send(createResult(req.path, 0, '权限不足'))
          resolve()
        }
      }).catch(err => {
        reject()
      })
    })
  })
}
