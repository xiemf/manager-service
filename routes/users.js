var express = require('express')
var router = express.Router()
const UserService = require('../api/UserService')
const { createError, createResult, createListResult } = require('../util')
const verifyPrivilege = require('../util/verifyPrivilege')
const jwt = require('jsonwebtoken')
const { privateKey, expiresIn } = require('../config/jwt')

/**
 * baseUrl users
 */

router.post('/login', function (req, res, next) {
  UserService.login(req.body).then(async result => {
    if (result) {
      let privileges = await UserService.userPrivilege(result.id)
      let content = { userId: result.id, username: result.username, privileges }
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
  jwt.verify(token, privateKey, async(err, decoded) => {
    let user = await UserService.detail(decoded.userId)
    res.send(createResult(user, 101, '查询成功'))
  })
})
router.get('/privilege', function (req, res, next) {
  let token = req.get('SUNNY-TOKEN')
  jwt.verify(token, privateKey, async(err, decoded) => {
    let privilege = await UserService.userPrivilege(decoded.userId)
    res.send(createResult(privilege, 101, '查询成功'))
  })
})
router.get('/page', async function (req, res, next) {
  await verifyPrivilege('1020200100', req, res)
  let { offset = 0, limit = 10 } = req.query
  let result = await UserService.page(req.query)
  let data = result.rows
  let total = result.count
  res.send(
    createListResult({
      data,
      total,
      offset,
      limit
    })
  )
})

router.post('/create', async function (req, res, next) {
  try {
    await verifyPrivilege('1020200102', req, res)
    let user = req.body
    let result = await UserService.create(user)
    res.send(createResult(result, 101, '新增成功'))
  } catch (e) {
    res.status(400).send(createError(e))
  }
})
router.put('/update/:id', async function (req, res, next) {
  try {
    await verifyPrivilege('1020200103', req, res)
    let id = parseInt(req.params.id)
    if (isNaN(id)) {
      res.status(400).send(createResult('', 102, 'id must be an Number'))
    }
    let user = req.body
    delete user.id
    let result = await UserService.update(user, id)
    res.send(createResult(result, 101, '编辑成功'))
  } catch (e) {
    res.status(400).send(createError(e))
  }
})
router.put('/freeze/:id', async function (req, res, next) {
  try {
    await verifyPrivilege('1020200105', req, res)
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
router.put('/thaw/:id', async function (req, res, next) {
  try {
    await verifyPrivilege('1020200106', req, res)
    let id = req.params.id
    if (/[0-9]+/.test(id)) {
      id = parseInt(id)
      let result = await UserService.thaw(id)
      res.send(createResult(result, 101, '启用成功'))
    } else {
      res.status(400).send(createResult('', 102, 'id must be an Number'))
    }
  } catch (e) {
    res.status(400).send(createError(e))
  }
})
router.get('/userPrivilege', async function (req, res, next) {
  await verifyPrivilege('1020200107', req, res)
  let id = req.query.id
  id = parseInt(id)
  let privilege = await UserService.userPrivilege(id)
  res.send(createResult(privilege))
})
module.exports = router
