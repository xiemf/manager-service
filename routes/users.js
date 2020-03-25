var express = require('express')
var router = express.Router()
const UserService = require('../api/UserService')
const {
  createError,
  createResult,
  createListResult
} = require('../util')
const jwt = require('jsonwebtoken')
const {
  privateKey,
  expiresIn
} = require('../config/jwt')

router.post('/login', function (req, res, next) {
  UserService.login(req.body).then(result => {
    if (result) {
      let content = {
        userId: result.id,
        username: result.username
      }
      let token = jwt.sign(content, privateKey, {
        expiresIn
      }) //有效期
      res.send(createResult(token, 101, '登录成功'))
    } else {
      res.send(createResult('login fail', 102, '登录名或密码错误'))
    }
  })
})
router.get('/info', function (req, res, next) {
  let token = req.get('SUNNY-TOKEN')
  jwt.verify(token, privateKey, (err, decoded) => {
    res.send(createResult(decoded, 101))
  })
})
router.get('/role/list',async function(req,res,next){
  let id = req.query.id
  let user = await UserService.detail(id)
  let roles = await user.getRoles()
  console.log(roles)
  res.send(createResult(roles, 101))
})
router.post('/role/save',async function(req,res,next){
  let id = req.body.id
  let roleIdList = req.body.roleIdList
  let user = await UserService.detail(id)
  console.log(user)
  let roles = await user.setRoles(roleIdList)
  console.log(roles)
  res.send(createResult(roles, 101,'配置成功'))
})
router.get('/page', async function (req, res, next) {
  let {
    offset = 0,
      limit = 10
  } = req.query

  let result = await UserService.page(req.query)
  let data = result.rows
  let total = result.count
  res.send(createListResult({
    data,
    total,
    offset,
    limit
  }))

})

router.post('/create', async function (req, res, next) {
  try {
    let user = req.body
    let result = await UserService.create(user)
    res.send(createResult(result, 101, '新增成功'))
  } catch (e) {
    res.status(400).send(createError(e))
  }
})
router.put('/update/:id', async function (req, res, next) {
  try {
    console.log('update')
    let id = parseInt(req.params.id)
    if (isNaN(id)) {
      res.status(400).send(createResult('', 102, 'id must be an Number'))
    }
    let user = req.body
    delete user.id
    let result = await UserService.update(user,id)
    res.send(createResult(result, 101, '编辑成功'))
  } catch (e) {
    res.status(400).send(createError(e))
  }
})
router.delete('/freeze/:id', async function (req, res, next) {
  try {
    let id = req.params.id
    if (/[0-9]+/.test(id)) {
      id = parseInt(id)
      let result = await UserService.freeze(id)
      res.send(createResult(result, 101, '冻结成功'))
    } else {
      res.status(400).send(createResult('', 102, 'id must be an Number'))
    }
  } catch (e) {
    res.status(400).send(createError(e))
  }
})

module.exports = router