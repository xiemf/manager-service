var express = require('express')
var router = express.Router()
const verifyPrivilege = require('../util/verifyPrivilege')

const PrivilegeService = require('../api/PrivilegeService')
const { createResult, createListResult, createError } = require('../util')
const { treeData } = require('../util/handleData')
router.get('/list', async function (req, res, next) {
  let result = await PrivilegeService.list()
  resultTree = treeData(result.map(v=>v.dataValues),'code','parent','children')
  res.send(createResult(resultTree))
})

module.exports = router
