const Sequelize = require('sequelize')
const sequelize = require('../../db/sequelize')

const Project = sequelize.define('project', {
  id: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    autoIncrement: true // 自增
  },
  No: {
    type: Sequelize.BIGINT(11),
    unique: 'YEAR_NO'
  },
  createYear:{
    type: Sequelize.STRING(50),
  },
  createMonth:{
    type: Sequelize.STRING(50),
  },
  exclusiveSupply:{
    type: Sequelize.STRING(50),
    defaultValue:'/'
  },
  levelOneSupply:{
    type: Sequelize.STRING(50),
    defaultValue:'/'
  },
  levelTwoSupply:{
    type: Sequelize.STRING(50),
    defaultValue:'/'
  },
  levelThreeSupply:{
    type: Sequelize.STRING(50),
    defaultValue:'/'
  },
  createTime: {
    // 商务立项时间
    type: Sequelize.BIGINT,
    unique: 'YEAR_NO'
  },
  recordNo: { type: Sequelize.STRING(50), unique: true },
  customer: { type: Sequelize.STRING(50) },
  productPartNo: { type: Sequelize.STRING(50), unique: true },
  productStructure: { type: Sequelize.STRING(50) },
  productPixel: { type: Sequelize.STRING(50) },
  productVCM: { type: Sequelize.STRING(50) },
  audit: { type: Sequelize.STRING(50) },
  fromPartNo: { type: Sequelize.STRING(50) },
  amount: { type: Sequelize.STRING(50) },
  TSEndTime: { type: Sequelize.BIGINT },
  ESEndTime: { type: Sequelize.BIGINT },
  DRTime: { type: Sequelize.BIGINT },
}, {
  tableName: 't_project'
})

module.exports = Project
// const project = {
//   createTime: new Date(),
//   NO: 1,
//   recordNo: '1801-001',
//   projectType: '标准变更',
//   customer: 'vivo',
//   pattern: '未定',
//   patternInfo: {
//     exclusiveSupply: '/',
//     levelOneSupply: '/',
//     levelTwoSupply: '/',
//     levelThreeSupply: '/'
//   },
//   productPartNo: '3229A-400',
//   productStructure: '3P',
//   productPixel: '2M',
//   productVCM: 'FF',
//   audit: '通过',
//   fromPartNo: '3229A',
//   amount: '10KK以上',
//   TSEndTime: new Date(),
//   ESEndTime: new Date(),
//   DRTime: new Date()
// }
