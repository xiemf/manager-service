const Models = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  list:()=>{
    return Models.Role.findAll()
  },
  page: query => {
    let { limit = 10, offset = 0 } = query
    let where = {}
    return Models.Role.findAndCountAll({
      limit,
      offset,
      where,
      order: [['id', 'DESC']]
    })
  },
  create: chip => {
    delete chip.id
    return Models.Role.create(chip)
  },
  update: (chip, id) => {
    return Models.Role.update(chip, {
      where: {
        id
      }
    })
  },
  delete: id => {
    return Models.Role.destroy({
      where: {
        id
      }
    })
  }
}
