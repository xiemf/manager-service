var express = require('express')
var router = express.Router()
const verifyPrivilege = require('../util/verifyPrivilege')

const ChipService = require('../api/ChipService')
const { createError, createResult, createListResult } = require('../util')
/* GET home page. */
router.get('/page', async function (req, res, next) {
  await verifyPrivilege('1120200100', req, res)
  let { offset = 0, limit = 10 } = req.query
  let result = await ChipService.page(req.query)
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
    await verifyPrivilege('1120200102', req, res)
    let chip = req.body
    // if (chip.pixel) {
    //   chip.pixel = parseFloat(chip.pixel)
    //   if (isNaN(chip.pixel)) {
    //     res.status(400).send(createResult('', 102, 'Pixel must be an Number'))
    //   }
    // }
    let result = await ChipService.create(chip)
    res.send(createResult(result, 101, '新增成功'))
  } catch (e) {
    res.status(400).send(createError(e))
  }
})
router.put('/update/:id', async function (req, res, next) {
  try {
    await verifyPrivilege('1120200103', req, res)
    let id = req.params.id
    if (/[0-9]+/.test(id)) {
      id = parseInt(id)
      let chip = req.body
      delete chip.id
      if (chip.pixel) {
        chip.pixel = parseFloat(chip.pixel)
        if (isNaN(chip.pixel)) {
          res.status(400).send(createResult('', 102, 'Pixel must be an Number'))
        }
      }
      let result = await ChipService.update(chip, id)
      res.send(createResult(result, 101, '修改成功'))
    } else {
      res.status(400).send(createResult('', 102, 'id must be an Number'))
    }
  } catch (e) {
    res.status(400).send(createError(e))
  }
})
router.delete('/delete/:id', async function (req, res, next) {
  try {
    await verifyPrivilege('1120200104', req, res)
    let id = req.params.id
    if (/[0-9]+/.test(id)) {
      id = parseInt(id)
      let result = await ChipService.delete(id)
      res.send(createResult(result, 101, '删除成功'))
    } else {
      res.status(400).send(createResult('', 102, 'id must be an Number'))
    }
  } catch (e) {
    res.status(400).send(createError(e))
  }
})
router.get('/search', async function (req, res, next) {
  let sensor = req.query.sensor
  let result = await ChipService.search(sensor)
  res.send(createResult(result, 101, '查询成功'))
})
router.get('/validate', async function (req, res, next) {
  let sensor = req.query.sensor
  let result = await ChipService.validate(sensor)
  res.send(createResult(result, 101, '查询成功'))
})
module.exports = router
