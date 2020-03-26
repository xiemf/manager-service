var express = require('express')
var router = express.Router()
const fs = require('fs')
const multer = require('multer')
const path = require('path')
var upload = multer({ dest: 'upload_tmp/' })
router.post('/file', upload.any(), function (req, res, next) {
  console.log(req.files[0])
  var des_file =   req.files[0].originalname
  return 
})
module.exports = router
