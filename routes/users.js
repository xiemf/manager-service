var express = require('express')
var router = express.Router()
const UserService = require('../controllers/UserService')
const { createResult } = require('../util/createResult')
const jwt = require('jsonwebtoken')
const { privateKey, expiresIn } = require('../config/jwt')
/* GET users listing. */
router.post('/login', function (req, res, next) {
  UserService.GetUserByUserNameAndPw(req.body).then(result => {
    if (result) {
      let content = { userId: result.id, username: result.username }
      let token = jwt.sign(content, privateKey, { expiresIn }) //有效期
      res.send(createResult(token, 101, '登录成功'))
    } else {
      res.send(createResult('login success', 102, '登录名或密码错误'))
    }
  })
})
router.get('/info', function (req, res, next) {
  let token = req.get('SUNNY-TOKEN')
  jwt.verify(token, privateKey, (err, decoded) => {
    res.send(createResult(decoded, 101))
  })
})

module.exports = router
