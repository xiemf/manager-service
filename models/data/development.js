const Sequelize = require('sequelize')
const sequelize = require('../../db/sequelize')

const Development = sequelize.define(
  'development',
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
    productPartNo: { type: Sequelize.STRING(50), unique: true },
    ESEndTime: { type: Sequelize.BIGINT },
    parentType: { type: Sequelize.STRING(50) },
    type: { type: Sequelize.STRING(50) },
    apply: { type: Sequelize.STRING(50) },
    projectType: { type: Sequelize.STRING(50) },
    newType: { type: Sequelize.STRING(50) },
    lensType: { type: Sequelize.STRING(50) },
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
    imagePlane: { type: Sequelize.STRING(50) },
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

