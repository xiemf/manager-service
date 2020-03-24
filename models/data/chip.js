const Sequelize = require('sequelize')
const sequelize = require('../../db/sequelize')
const Chip = sequelize.define('chip',{
  id:{
    type:Sequelize.BIGINT(11),
    primaryKey:true,
    autoIncrement: true // 自增
  },
  sensor:{
    type:Sequelize.STRING(50),
    allowNull: false,
    unique: true,
  },
  size:{
    type:Sequelize.STRING(50),
  },
  pixel:{
    type: Sequelize.FLOAT
  }
},{
  timestamps: false,
  tableName: 't_chip'
})


module.exports = Chip


