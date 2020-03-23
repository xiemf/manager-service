const Sequelize = require('sequelize')
const sequelize = require('../db/sequelize')

const Development = sequelize.define(
  'project',
  {
    id: {
      type: Sequelize.BIGINT(11),
      primaryKey: true,
      autoIncrement: true // 自增
    },
    projectCreateTime:{
      type: Sequelize.BIGINT 
    },
    No: {
      type: Sequelize.BIGINT(11),
      unique: 'YEAR_NO'
    },
    createYear: {
      type: Sequelize.STRING(50)
    },
    productPortNo: { type: Sequelize.STRING(50), unique: true },
    ESEndTime: { type: Sequelize.BIGINT },
    parentType: { type: Sequelize.STRING(50) },
    type: { type: Sequelize.STRING(50) },
    apply: { type: Sequelize.STRING(50) },
    projectType: { type: Sequelize.STRING(50) },
    newType: { type: Sequelize.STRING(50) },
    shapeSize: { type: Sequelize.STRING(50) },
    isUltraThin: { type: Sequelize.BOOLEAN, defaultValue: false },
    isLittleHead: { type: Sequelize.BOOLEAN, defaultValue: false },
    isLargeImage: { type: Sequelize.BOOLEAN, defaultValue: false },
    isLargeAperture: { type: Sequelize.BOOLEAN, defaultValue: false },
    customer: { type: Sequelize.STRING(50) },
    background: { type: Sequelize.STRING(255) },
    complexity: { type: Sequelize.STRING(50) },
    preDRTime: { type: Sequelize.BIGINT },
    prePlotTime: { type: Sequelize.BIGINT},
    DRTime: { type: Sequelize.BIGINT },
    PlotTime: { type: Sequelize.BIGINT },
    department: { type: Sequelize.STRING(50) },
    remark: { type: Sequelize.STRING(50) },
    opticalBear: { type: Sequelize.STRING(50) },
    structureBear: { type: Sequelize.STRING(50) },
    PM: { type: Sequelize.STRING(50) },
    TTL: { type: Sequelize.FLOAT },
    FNO: { type: Sequelize.FLOAT },
    FOV: { type: Sequelize.FLOAT },
    structure: { type: Sequelize.STRING(50) },
    headDia: { type: Sequelize.FLOAT },
    depth: { type: Sequelize.FLOAT }
  },
  {
    tableName: 't_development'
  }
)

module.exports = Development

const development = {
  projectCreateTime: new Date(),
  NO: 1,
  productPortNo: '3590A-400',
  ESEndTime: new Date(),
  parentType: '手机',
  type: '后置',
  apply: '景深',
  projectType: '立项变更',
  newType: '量产变形',
  shapeSize: 'M5*0.25',
  isUltraThin: 0,
  isLittleHead: 0,
  isLargeImage: 0,
  isLargeAperture: 0,
  customer: 'moto',
  background: '3586A换料号外推MOTO',
  complexity: '一般',
  preDRTime: new Date(),
  prePlotTime: new Date(),
  DRTime: new Date(),
  PlotTime: new Date(),
  department: '制造',
  remark: '',
  opticalBear: '谢检来',
  structureBear: '戴世浩',
  PM: '',
  TTL: 2.9,
  FNO: 2.4,
  FOV: 83,
  structure: '3P',
  headDia: '',
  depth: ''
}
