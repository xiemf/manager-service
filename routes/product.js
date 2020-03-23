var express = require('express');
var router = express.Router();
const ProductService = require('../api/ProductService')
const {
  createResult,
  createListResult,
  createError
} = require('../util')
/* GET */
router.get('/page', async function (req, res, next) {
  let {
    offset = 0,
    limit = 10
  } = req.query
  
  let result = await ProductService.page(req.query)
  let data = result.rows
  let total = result.count
  res.send(createListResult({
    data,
    total,
    offset,
    limit
  }))
});
router.post('/add', async function (req, res, next) {
  try {
    let product = req.body
    let result = await ProductService.add(product)
    res.send(createResult(result, 101, '新增成功'))
  } catch (e) {
    next()
    // res.status(400).send(createError(e))
  }
});

module.exports = router;