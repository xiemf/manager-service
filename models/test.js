const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')

const Test = sequelize.define(
  'test',
  {
    id: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      autoIncrement: true // 自增
    },
    version: { type: Sequelize.BIGINT(11), unique: 'PN-V' },
    updateTime: { type: Sequelize.BIGINT },
    productPartNo: { type: Sequelize.STRING(50), unique: 'PN-V' },
    MTFMCYield: { type: Sequelize.FLOAT,comment: 'MTF MC良率(%)' },
    MLALLoss: { type: Sequelize.FLOAT,comment: '杂光全检损耗(%)' },
    appearanceLoss: { type: Sequelize.FLOAT,comment: '过程外观损耗(%)' },
    SCLoss: { type: Sequelize.FLOAT ,comment: '天面镀膜损耗(%)'},
    macroAssessment: { type: Sequelize.FLOAT,comment: '微距考核(%)' },
    smallHead: { type: Sequelize.FLOAT, comment: '小头部(%)' },
    ComprehensiveMCYield: { type: Sequelize.FLOAT ,comment: '综合MC良率(%)' }
  },
  {
    tableName: 't_test'
  }
)

module.exports = Test

// const test = {
//   version: '00',
//   updateTime: new Date(),
//   productPartNo: '2D07A-400',
//   MTFMCYield: 85,
//   MLALLoss: 0,
//   appearanceLoss: 5,
//   SCLoss: 0,
//   macroAssessment: 100,
//   smallHead: 100,
//   ComprehensiveMCYield: 80
// }
