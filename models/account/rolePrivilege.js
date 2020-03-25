const Sequelize = require('sequelize')
const sequelize = require('../../db/sequelize')
const RolePrivilege = sequelize.define('rolePrivilege',{
  id:{
    type:Sequelize.BIGINT(11),
    primaryKey:true,
    autoIncrement: true // 自增
  }
},{
  // timestamps: false,
  tableName: 't_role_privilege'
})


module.exports = RolePrivilege


