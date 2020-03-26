var express = require('express')
var router = express.Router()
const verifyPrivilege = require('../util/verifyPrivilege')

const ProjectService = require('../api/ProjectService')
const { createResult, createListResult, createError } = require('../util')
/* GET */
router.get('/page', async function (req, res, next) {
  await verifyPrivilege('1120200500', req, res)
  let { offset = 0, limit = 10 } = req.query
  let result = await ProjectService.page(req.query)
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
router.get('/:id', async function (req, res, next) {
  await verifyPrivilege('1120200500', req, res)
  let id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send(createResult('', 102, 'id must be an Number'))
  }
  let result = await ProjectService.detail(id)
  res.send(createResult(result, 101, '查询成功'))
})
router.post('/create', async function (req, res, next) {
  try {
    await verifyPrivilege('1120200502', req, res)
    let product = req.body
    let result = await ProjectService.create(product)
    res.send(createResult(result, 101, '新增成功'))
  } catch (e) {
    res.status(400).send(createError(e))
  }
})
router.put('/update/:id', async function (req, res, next) {
  try {
    await verifyPrivilege('1120200503', req, res)
    let id = parseInt(req.params.id)
    if (isNaN(id)) {
      res.status(400).send(createResult('', 102, 'id must be an Number'))
    }
    let product = req.body
    delete product.id
    let result = await ProjectService.update(product,id)
    res.send(createResult(result, 101, '编辑成功'))
  } catch (e) {
    res.status(400).send(createError(e))
  }
})
router.delete('/delete/:id', async function (req, res, next) {
  try {
    await verifyPrivilege('1120200504', req, res)
    let id = req.params.id
    if (/[0-9]+/.test(id)) {
      id = parseInt(id)
      let result = await ProjectService.delete(id)
      res.send(createResult(result, 101, '删除成功'))
    } else {
      res.status(400).send(createResult('', 102, 'id must be an Number'))
    }
  } catch (e) {
    res.status(400).send(createError(e))
  }
})

module.exports = router
