const Models = require('../models/index')
const Sequelize = require('sequelize')
const md5 = require('md5-node')
const Op = Sequelize.Op
const { flatData, noRepeatArr } = require('../util/handleData')
const RoleService = require('./RoleService')

const TIME_KEYS = []
module.exports = {
  page: async query => {
    let { limit = 10, offset = 0 } = query
    let where = {}
    Object.keys(query).forEach(key => {
      if (query[key] === '') return
      if (['username', 'nickName'].includes(key)) {
        where[key] = {
          [Op.like]: '%' + query[key] + '%'
        }
      }
      if (['freeze'].includes(key)) {
        where[key] = query[key]
      }
    })

    let order = [['id', 'DESC']]
    let itemList = await Models.User.findAndCountAll({
      limit,
      offset,
      where,
      order,
      include: [
        {
          model: Models.Role,
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        }
      ],
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
    delete params.freeze
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
  },
  thaw: id => {
    return Models.User.update(
      { freeze: false },
      {
        where: {
          id
        }
      }
    )
  },
  userPrivilege: async id => {
    try {
      let user = await Models.User.findOne({ where: { id }})
      let roleRes = await user.getRoles()
      let roleIds = roleRes.map(v => v.dataValues.id)
      let rolePrivilegeRes = await RoleService.listByRoleIds(roleIds)
      let privilegeRes = rolePrivilegeRes.map(v => v.dataValues.privileges)
      privilegeRes = flatData(privilegeRes)
      let privilege = noRepeatArr(privilegeRes.map(v => v.dataValues),'id')
      return privilege
    } catch (e) {
      throw e
    }
  }
}
