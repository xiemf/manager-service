const Models = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const TIME_KEYS = ['projectCreateTime','ESEndTime', 'preDRTime', 'prePlotTime','DRTime','PlotTime']
module.exports = {
  page: async query => {
    let { limit = 10, offset = 0 } = query
    let where = {}
    if(query.createYear){
      where.createYear = query.createYear
    }
    let order = [['id', 'DESC']]
    let projectList = await Models.Development.findAndCountAll({
      limit,
      offset,
      where,
      order
    })
    return projectList
  },
  create: async params => {
    // 格式化时间
    delete params.id
    let createTime = new Date(params.createTime)
    params.createYear = createTime.getFullYear() // 获取年份
    params.createTime = createTime.getTime()
    Object.keys(params).forEach(key => {
      if (params[key] === '') return
      if (TIME_KEYS.includes(key)) {
        params[key] = new Date(params[key]).getTime()
      }
    })
    params.No = await buildNo(params.createYear)
    return Models.Development.create(params)
  },
 
  update: async (params, id) => {
    delete params.id
    let createTime = new Date(params.createTime)
    params.createYear = createTime.getFullYear() // 获取年份
    Object.keys(params).forEach(key => {
      if (params[key] === '') return
      if (TIME_KEYS.includes(key)) {
        params[key] = new Date(params[key]).getTime()
      }
    })
    params.No = await buildNo(params.createYear)
    return Models.Development.update(params, { where: { id } })
  },
  detail: id => {
    return Models.Development.findOne({ where: { id } })
  },
  delete: id => {
    return Models.Development.destroy({
      where: {
        id
      }
    })
  }
}

const buildNo = async Year => {
  let yearMaxRow = await Models.Development.findAll({
    where: { createYear: Year },
    attributes: [[Sequelize.fn('MAX', Sequelize.col('No')), 'maxNo']]
  })
  let YearMaxNo = yearMaxRow[0].get('maxNo')
  return YearMaxNo ? YearMaxNo + 1 : 1
}

