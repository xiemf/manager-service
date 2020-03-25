const Models = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const TIME_KEYS = ['updateTime']
module.exports = {
  page: async query => {
    let { limit = 10, offset = 0 } = query
    let where = {}
    if (query.partNo) {
      where.productPartNo = query.partNo
    }
    let order = [
      ['productPartNo', 'DESC'],
      ['version', 'ASC']
    ]
    let itemList = await Models.Test.findAndCountAll({
      limit,
      offset,
      where,
      order
    })
    return itemList
  },
  create: async params => {
    // 格式化时间
    params.updateTime = new Date()
    Object.keys(params).forEach(key => {
      if (params[key] === '') return
      if (TIME_KEYS.includes(key)) {
        params[key] = new Date(params[key]).getTime()
      }
    })
    delete params.id
    params.version = await buildVersion(params.productPartNo)
    return Models.Test.create(params)
  },

  update: async (params, id) => {
    delete params.id
    Object.keys(params).forEach(key => {
      if (params[key] === '') return
      if (TIME_KEYS.includes(key)) {
        params[key] = new Date(params[key]).getTime()
      }
    })
    params.version = await buildVersion(params.productPartNo)
    return Models.Test.update(params, { where: { id } })
  },
  detail: id => {
    return Models.Test.findOne({ where: { id } })
  },
  delete: id => {
    return Models.Test.destroy({
      where: {
        id
      }
    })
  }
}

const buildVersion = async partNo => {
  let protNoVersionMaxRow = await Models.Test.findAll({
    where: { productPartNo: partNo },
    attributes: [[Sequelize.fn('MAX', Sequelize.col('version')), 'maxVersion']]
  })
  let protNoVersion = protNoVersionMaxRow[0].get('maxVersion')
  return protNoVersion !== null ? protNoVersion + 1 : 0
}
