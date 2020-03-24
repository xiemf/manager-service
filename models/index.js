// data
const Product = require('./data/product')
const Chip = require('./data/chip')
const Project = require('./data/project')
const Development = require('./data/development')
const Test = require('./data/test')

Chip.hasMany(Product, { as: 'products' })
Product.belongsTo(Chip)

// account
const User = require('./account/user')
const Role = require('./account/role')
const UserRole = require('./account/userRole')
const Privilege = require('./account/privilege')

User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });




module.exports = {
  Product,
  Chip,
  Project,
  Development,
  Test,
  User,
  Role,
  UserRole,
  Privilege
}

const sequelize = require('../db/sequelize')
sequelize.sync({ alter: true }).then(res => {
  console.log('数据库表同步成功！')
})