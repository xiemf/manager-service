var express = require('express')
var router = express.Router()

const RoleService = require('../api/RoleService')
const { createResult, createListResult, createError } = require('../util')
/* GET */
router.get('/list', async function (req, res, next) {
  let roleId = req.query.roleId
  let role = await RoleService.detail(roleId)
  let privileges = await role.getPrivileges()
  res.send(createResult(privileges, 101))
})

router.post('/save', async function (req, res, next) {
  let roleId = req.body.roleId
  let privilegeIdList = req.body.privilegeIdList
  let role = await RoleService.detail(roleId)
  let privileges = await role.setPrivileges(privilegeIdList)
  res.send(createResult(privileges, 101,'配置成功'))
})

module.exports = router
