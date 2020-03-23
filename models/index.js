const Product = require('./product')
const Chip = require('./chip')

Chip.hasMany(Product,{as: 'Products' })
Product.belongsTo(Chip);

module.exports = {
  Product,
  Chip
}