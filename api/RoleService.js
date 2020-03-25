const Models = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  list: () => {
    return Models.Role.findAll()
  },
  page: query => {
    let { limit = 10, offset = 0 } = query
    let where = {}
    return Models.Role.findAndCountAll({
      limit,
      offset,
      where,
      // include: [
      //   {
      //     model: Models.Privilege,
      //     attributes: ['id','name','code'],
      //     through:{
      //       attributes:[]
      //     }
      //   }
      // ],
      order: [['id', 'DESC']]
    })
  },
  detail: id => {
    return Models.Role.findOne({ where: { id } })
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
  },
  listByRoleIds: (roleIds) => {
    return Models.Role.findAll({
      where: {
        id: roleIds
      },
      include: [
        {
          model: Models.Privilege,
          attributes: ['id', 'name', 'code'],
          through: {
            attributes: []
          }
        }
      ]
    })
  }
}
