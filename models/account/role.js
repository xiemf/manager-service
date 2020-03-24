const Sequelize = require('sequelize')
const sequelize = require('../../db/sequelize')
const Role = sequelize.define(
  'role',
  {
    id: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      autoIncrement: true // 自增
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    systemRole: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    // timestamps: false,
    tableName: 't_role'
  }
)

module.exports = Role
