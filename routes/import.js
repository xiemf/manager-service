var express = require('express')
var router = express.Router()

const fs = require('fs')
const path = require('path')

const multer = require('multer')
const xlsx = require('node-xlsx')
const { createResult } = require('../util')
var upload = multer({ dest: 'import_xlsx_tmp/' })

router.post('/chip', upload.any(), function (req, res, next) {
  let excelFile = req.files[0].filename
  const workBook = xlsx.parse(
    fs.readFileSync(`${__dirname}/../import_xlsx_tmp/${excelFile}`)
  )
  let sheetData = workBook[0].data
  console.log(sheetData)
  let sheetLen = sheetData.length
  let resultKey = { sensor: 0, size: 0, pixel: 0 }
  let indexRow = null
  let result = []
  for (let i=0; i < sheetLen; i++) {
    if (indexRow !== null) {
      let obj = {}
      Object.keys(resultKey).forEach(key => {
        obj[key] = sheetData[i][resultKey[key]]
      })
      result.push(obj)
    } else {
      sheetData[i].forEach((v, index) => {
        if (v) {
          if (Object.keys(resultKey).includes(v.trim().toLocaleLowerCase())) {
            resultKey[v] = index // 索引key所在的列
            indexRow = i // 索引所在行
          }
        }
      })
    }
  }
  res.send(createResult(result))
})

module.exports = router
