var express = require('express')
var router = express.Router()
const RoleService = require('../api/RoleService')
const {
  createError,
  createResult,
  createListResult
} = require('../util')

router.get('/page', async function (req, res, next) {
  let {
    offset = 0,
      limit = 10
  } = req.query

  let result = await RoleService.page(req.query)
  let data = result.rows
  let total = result.count
  res.send(createListResult({
    data,
    total,
    offset,
    limit
  }))

})
router.get('/list',async function(req,res,next){
  let role = await RoleService.list()
  res.send(createResult(role, 101))
})
router.post('/create', async function (req, res, next) {
  try {
    let user = req.body
    let result = await RoleService.create(user)
    res.send(createResult(result, 101, '新增成功'))
  } catch (e) {
    res.status(400).send(createError(e))
  }
})
router.put('/update/:id', async function (req, res, next) {
  try {
    let id = parseInt(req.params.id)
    if (isNaN(id)) {
      res.status(400).send(createResult('', 102, 'id must be an Number'))
    }
    let role = req.body
    delete role.id
    let result = await RoleService.update(role,id)
    res.send(createResult(result, 101, '编辑成功'))
  } catch (e) {
    res.status(400).send(createError(e))
  }
})
router.delete('/delete/:id', async function (req, res, next) {
  try {
    let id = req.params.id
    if (/[0-9]+/.test(id)) {
      id = parseInt(id)
      let result = await RoleService.delete(id)
      res.send(createResult(result, 101, '删除成功'))
    } else {
      res.status(400).send(createResult('', 102, 'id must be an Number'))
    }
  } catch (e) {
    res.status(400).send(createError(e))
  }
})

module.exports = router