const Sequelize = require('sequelize')
const sequelize = require('../../db/sequelize')
const Privilege = sequelize.define('privilege',{
  id:{
    type:Sequelize.BIGINT(11),
    primaryKey:true,
    autoIncrement: true // 自增
  },
  name:{
    type:Sequelize.STRING(50),
    allowNull: false,
    // unique: true,
  },
  code:{
    type:Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  parent:{
    type:Sequelize.STRING(50),
    allowNull: false,
  }
},{
  // timestamps: false,
  tableName: 't_privilege'
})


module.exports = Privilege


