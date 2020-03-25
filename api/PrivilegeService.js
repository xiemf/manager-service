const Models = require('../models/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  list: () => {
    return Models.Privilege.findAll()
  },
  
}
