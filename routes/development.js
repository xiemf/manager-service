var express = require('express')
var router = express.Router()
const DevelopmentService = require('../api/DevelopmentService')
const { createResult, createListResult, createError } = require('../util')
/* GET */
router.get('/page', async function (req, res, next) {
  await verifyPrivilege('1120200300', req, res)
  let { offset = 0, limit = 10 } = req.query
  let result = await DevelopmentService.page(req.query)
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
  await verifyPrivilege('1120200300', req, res)
  let id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.status(400).send(createResult('', 102, 'id must be an Number'))
  }
  let result = await DevelopmentService.detail(id)
  res.send(createResult(result, 101, '查询成功'))
})
router.post('/create', async function (req, res, next) {
  try {
    await verifyPrivilege('1120200302', req, res)
    let product = req.body
    let result = await DevelopmentService.create(product)
    res.send(createResult(result, 101, '新增成功'))
  } catch (e) {
    res.status(400).send(createError(e))
  }
})
router.put('/update/:id', async function (req, res, next) {
  try {
    await verifyPrivilege('1120200303', req, res)
    let id = parseInt(req.params.id)
    if (isNaN(id)) {
      res.status(400).send(createResult('', 102, 'id must be an Number'))
    }
    let product = req.body
    delete product.id
    let result = await DevelopmentService.update(product,id)
    res.send(createResult(result, 101, '编辑成功'))
  } catch (e) {
    res.status(400).send(createError(e))
  }
})
router.delete('/delete/:id', async function (req, res, next) {
  try {
    await verifyPrivilege('1120200304', req, res)
    let id = req.params.id
    if (/[0-9]+/.test(id)) {
      id = parseInt(id)
      let result = await DevelopmentService.delete(id)
      res.send(createResult(result, 101, '删除成功'))
    } else {
      res.status(400).send(createResult('', 102, 'id must be an Number'))
    }
  } catch (e) {
    res.status(400).send(createError(e))
  }
})

module.exports = router
