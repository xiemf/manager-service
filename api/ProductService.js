const Models = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const ChipService = require('./ChipService')

module.exports = {
  page: async query => {
    let { limit = 10, offset = 0 } = query
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
      order: [['id', 'DESC']]
    })
    return product
  },
  create: async params => {
    let chipParams = params.chip
    delete params.chip
    let hasChip = await ChipService.validate(chipParams.sensor)
    if (hasChip) {
      params.chipId = hasChip.id
    } else {
      let newChip = await ChipService.create(chipParams)
      params.chipId = newChip.id
    }
    return Models.Product.create(params)
  },
  detail: id => {
    return Models.Product.findOne({ where: { id }, include: [Models.Chip] })
  },
  update: async (params, id) => {
    console.log(id)
    let chipParams = params.chip
    delete params.chip
    let hasChip = await ChipService.validate(chipParams.sensor)
    if (hasChip) {
      params.chipId = hasChip.id
    } else {
      let newChip = await ChipService.create(chipParams) //Models.Chip.create(chipParams)
      params.chipId = newChip.id
    }
    return Models.Product.update(params, { where: { id } })
  },
  delete: (id) => {
    return Models.Product.destroy({
      where: {
        id
      }
    })
  }
}
