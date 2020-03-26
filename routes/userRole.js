var express = require('express')
var router = express.Router()
const verifyPrivilege = require('../util/verifyPrivilege')

const UserService = require('../api/UserService')
const { createResult, createListResult, createError } = require('../util')
/* GET */
router.get('/list', async function (req, res, next) {
  await verifyPrivilege('1020200107', req, res)
  let id = req.query.id
  let user = await UserService.detail(id)
  let roles = await user.getRoles()
  res.send(createResult(roles, 101))
})

router.post('/save', async function (req, res, next) {
  await verifyPrivilege('1020200107', req, res)
  let id = req.body.id
  let roleIdList = req.body.roleIdList
  let user = await UserService.detail(id)
  let roles = await user.setRoles(roleIdList)
  res.send(createResult(roles, 101,'配置成功'))
})

module.exports = router
