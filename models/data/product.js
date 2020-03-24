const Sequelize = require('sequelize')
const sequelize = require('../../db/sequelize')


const Product = sequelize.define('product', {
  id: {
    type: Sequelize.BIGINT(11),
    primaryKey: true,
    autoIncrement: true // 自增
  },
  type: { // 类型
    type: Sequelize.STRING(50),
  },
  partNO: { // 物料号
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true
  },
  opticalSystem:{
    type: Sequelize.STRING(50),
    comment: '光学系统'
  },
  background: { // 背景
    type: Sequelize.STRING(255),
  },
  competitor: { // 竞争对手
    type: Sequelize.STRING(50),
  },
  chipId: { // 芯片id
    type: Sequelize.BIGINT(11),
  },
  FNO: {
    type: Sequelize.FLOAT,
  },
  FOV: {
    type: Sequelize.FLOAT,
  },
  TTL: {
    type: Sequelize.FLOAT,
  },
  FFL: {
    type: Sequelize.FLOAT,
  },
  maxCRA: {
    type: Sequelize.FLOAT,
  },
  structure: {
    type: Sequelize.STRING(50),
  },
  MIC: {
    type: Sequelize.FLOAT,
  },
  EFL: {
    type: Sequelize.FLOAT,
  },
  IR: {
    type: Sequelize.FLOAT,
  },
  barrel: {
    type: Sequelize.STRING(50),
  },
  packing: {
    type: Sequelize.STRING(50),
  },
  IH: {
    type: Sequelize.FLOAT,
  },
  VCM: {
    type: Sequelize.STRING(50),
  }
  
}, {
  timestamps: false,
  tableName: 't_product'
})


module.exports = Product


const product = {
  type: 'FHD',
  partNO: '3043C-400',
  background: '小米3043B改为小头一体式',
  opticalSystem: '3043',
  competitor: '',
  chip: {
    sensor: 'OV7251',
    size: '1/7.5\'\'',
    pixel: '0.8'
  },
  FNO: 2.40,
  FOV: 75.0,
  TTL: 2.90,
  FFL: 0.85,
  maxCRA: 28.0,
  structure: '3P',
  MIC: '2.7',
  EFL: 1.57,
  IR: 0.21,
  barrel: '一体式(5.9*4.8)',
  packing: 'COB',
  IH: '1.200',
  VCM: 'FF'
}