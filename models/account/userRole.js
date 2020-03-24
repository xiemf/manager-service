const Sequelize = require('sequelize')
const sequelize = require('../../db/sequelize')
const userRole = sequelize.define('userRole',{
  id:{
    type:Sequelize.BIGINT(11),
    primaryKey:true,
    autoIncrement: true // 自增
  }
},{
  // timestamps: false,
  tableName: 't_user_role'
})


module.exports = userRole


