const Models = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  page: query => {
    let { limit = 10, offset = 0 } = query
    let where = {}
    Object.keys(query).forEach(key => {
      if (query[key] === '') return
      if (['sensor'].includes(key)) {
        where[key] = {
          [Op.like]: '%' + query[key] + '%'
        }
      }
      if (['pixel'].includes(key)) {
        where[key] = parseFloat(query[key])
      }
      if (['size'].includes(key)) {
        where[key] = query[key]
      }
    })
    return Models.Chip.findAndCountAll({
      limit,
      offset,
      where,
      include: [
        {
          model: Models.Product,
          as: 'products'
        }
      ],
      order: [['id', 'DESC']]
    })
  },
  create: chip => {
    delete chip.id
    return Models.Chip.create(chip)
  },
  update: (chip, id) => {
    return Models.Chip.update(chip, {
      where: {
        id
      }
    })
  },
  delete: id => {
    return Models.Chip.destroy({
      where: {
        id
      }
    })
  },
  search: sensor => {
    let where = {}
    if (sensor.trim() !== '') {
      where.sensor = { [Op.like]: '%' + sensor + '%' }
    }
    return Models.Chip.findAll({
      offset: 0,
      limit: 10,
      where,
      // order: [['sensor', 'ASC']]
    })
  },
  validate: sensor => {
    return Models.Chip.findOne({
      where: {
        sensor
      }
    })
  }
}
