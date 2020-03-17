const mysql = require('mysql')
const mySqlConfig = require('../config/db')
module.exports = mysql.createPool(mySqlConfig)