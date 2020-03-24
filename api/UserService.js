const Models = require('../models/index')
const Sequelize = require('sequelize')
const md5 = require('md5-node')
const Op = Sequelize.Op

const TIME_KEYS = []
module.exports = {
  page: async query => {
    let { limit = 10, offset = 0 } = query
    let where = {  }
    let order = []
    let itemList = await Models.User.findAndCountAll({
      limit,
      offset,
      where,
      order,
      attributes: { exclude: ['password'] }
    })
    return itemList
  },
  create: async params => {
    // 格式化时间
    Object.keys(params).forEach(key => {
      if (params[key] === '') return
      if (TIME_KEYS.includes(key)) {
        params[key] = new Date(params[key]).getTime()
      }
    })
    params.password = md5(params.password)
    delete params.id
    return Models.User.create(params)
  },
  login: async params => {
    let { username, password } = params
    password = md5(password)
    return Models.User.findOne({
      where: {
        username,
        password,
        freeze: false
      }
    })
  },
  update: async (params, id) => {
    delete params.id
    delete params.password
    Object.keys(params).forEach(key => {
      if (params[key] === '') return
      if (TIME_KEYS.includes(key)) {
        params[key] = new Date(params[key]).getTime()
      }
    })
    return Models.User.update(params, { where: { id } })
  },
  detail: id => {
    return Models.User.findOne({
      where: { id },
      attributes: { exclude: ['password'] }
    })
  },
  freeze: id => {
    return Models.User.update(
      { freeze: true },
      {
        where: {
          id
        }
      }
    )
  }
}
