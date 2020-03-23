const Models = require('../models/index')
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const FLOAT_KEY = ['FNO','FOV','TTL','FFL','maxCRA','MIC','EFL','IR','IH']
const handleData = (data) => {
  let result = {}
  Object.keys(data).forEach(key => {
    if (data[key] === '') {
      return
    }
    if (FLOAT_KEY.includes(key)) {
      result[key] = parseFloat(data[key])
    }
  })
  return result
}
module.exports = {
  page: async (query) => {
    let {
      limit = 10, offset = 0
    } = query
    let where = {}
    Object.keys(query).forEach(key => {
      if (query[key] === '') return
      if (['partNO'].includes(key)) {
        where[key] = {
          [Op.like]: '%' + query[key] + '%'
        }
      }
    })
    let product = await Models.Product.findAndCountAll({
      limit,
      offset,
      where,
      include: [Models.Chip],
      order: [
        ['id', 'DESC']
      ]
    })
    return product
  },
  add: async (params) => {
    let chipParams = params.chip
    delete params.chip
    let hasChip = await Models.Chip.findOne({
      where: {
        sensor: chipParams.sensor
      }
    })
    if (hasChip) {
      params.chipId = hasChip.id
      return Models.Product.create(params)
    } else {
      let newChip = await Models.Chip.create(chipParams)
      params.chipId = newChip.id
      return Models.Product.create(params)
    }
  },
  update: async (params) => {
    let chipParams = params.chip
    delete params.chip
    let hasChip = await Models.Chip.findOne({
      where: {
        sensor: chipParams.sensor
      }
    })
    if (hasChip) {
      params.chipId = hasChip.id
    } else {
      let newChip = await Models.Chip.create(chipParams)
      params.chipId = newChip.id
    }
    return Models.Product.create(params)

  }
}