const Models = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  page: async query => {
    let { limit = 10, offset = 0 } = query
    let where = {}
    if(query.createYear){
      where.createYear = query.createYear
    }
    let order = [['createYear','DESC'],['No', 'DESC']]
    if(query.orderType){
      order[1][0] = query.orderField || 'No'
      order[1][1] = query.orderType || 'DESC'
    }
    let projectList = await Models.Project.findAndCountAll({
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
    params.createMonth = createTime.getMonth() + 1 // 获取月份
    params.createTime = createTime.getTime()
    Object.keys(params).forEach(key => {
      if (params[key] === '') return
      if (['TSEndTime', 'ESEndTime', 'DRTime'].includes(key)) {
        params[key] = new Date(params[key]).getTime()
      }
    })
    params.No = await buildNo(params.createYear)
    params.recordNo = await buildRecordNo(params.createYear, params.createMonth)
    return Models.Project.create(params)
  },
 
  update: async (params, id) => {
    delete params.id
    delete params.createTime
    Object.keys(params).forEach(key => {
      if (params[key] === '') return
      if (['TSEndTime', 'ESEndTime', 'DRTime'].includes(key)) {
        params[key] = new Date(params[key]).getTime()
      }
    })
    delete params.No
    delete params.recordNo
    // params.No = await buildNo(params.createYear)
    // params.recordNo = await buildRecordNo(params.createYear, params.createMonth)
    return Models.Project.update(params, { where: { id } })
  },
  detail: id => {
    return Models.Project.findOne({ where: { id } })
  },
  delete: id => {
    return Models.Project.destroy({
      where: {
        id
      }
    })
  }
}

const buildNo = async Year => {
  let yearMaxRow = await Models.Project.findAll({
    where: { createYear: Year },
    attributes: [[Sequelize.fn('MAX', Sequelize.col('No')), 'maxNo']]
  })
  let YearMaxNo = yearMaxRow[0].get('maxNo')
  return YearMaxNo ? YearMaxNo + 1 : 1
}
const buildRecordNo = async (Year, Month) => {
  let monthMaxRow = await Models.Project.findAll({
    where: { createYear: Year, createMonth: Month },
    attributes: [[Sequelize.fn('MAX', Sequelize.col('No')), 'maxNo']]
  })
  let monthMaxNo = monthMaxRow[0].get('maxNo')
  let maxNo = monthMaxNo ? monthMaxNo + 1 : 1
  let recordNoYear = (Year + '').substr(2)
  let recordNoMonth = Month > 9 ? Month : '0' + Month
  let recordNoNo
  if (maxNo < 10) {
    recordNoNo = '00' + maxNo
  } else if (maxNo < 100) {
    recordNoNo = '0' + maxNo
  } else {
    recordNoNo = '' + maxNo
  }
  // let recordNoNo =
  return `${recordNoYear}${recordNoMonth}-${recordNoNo}`
}
