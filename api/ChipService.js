const Models = require('../models/index')
const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = {
  page: (query) => {
    let {
      limit = 10, offset = 0
    } = query
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
      include: [{
        model: Models.Product,
        as: 'Products'
      }],
      order: [
        ['id', 'DESC']
      ]
    })
  },
  add: (chip) => {
    return Models.Chip.create(chip)
  },
  update:(chip,id)=>{
    return Models.Chip.update(chip,{
      where: {
        id
      }
    })
  },
  delete: (id) => {
    return Models.Chip.destroy({
      where: {
        id
      }
    })
  }
}