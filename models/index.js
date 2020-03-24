const Product = require('./product')
const Chip = require('./chip')
const Project = require('./project')
const Development = require('./development')
const Test = require('./test')

const sequelize = require('../db/sequelize')

Chip.hasMany(Product, { as: 'products' })
Product.belongsTo(Chip)

module.exports = {
  Product,
  Chip,
  Project,
  Development,
  Test
}


sequelize.sync({ alter: true }).then(res => {
  console.log('数据库表同步成功！')
})