const Sequelize = require('sequelize')
const sequelize = require('../../db/sequelize')
const User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      autoIncrement: true // 自增
    },
    username: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    nickName: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    freeze: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    // timestamps: false,
    tableName: 't_user'
  }
)

module.exports = User
