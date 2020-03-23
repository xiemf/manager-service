module.exports.createError = data => {
  let info = { code: 102 }
  switch (data.name) {
    case 'SequelizeDatabaseError':
      info.message = data.parent.sqlMessage.match((/\'(.*?)\'/gi))[0]+' date type is error'
      break
    case 'SequelizeUniqueConstraintError':
      info.message = data.errors[0].message
      break
    case 'SequelizeValidationError':
      info.message = data.errors[0].message
      break
    default:
      info.data = data
      info.message = '请求错误'
  }
  return info
  // if (data.name === 'SequelizeUniqueConstraintError') {
  //   return {
  //     code: 102,
  //     message: data.errors[0].message
  //   }
  // }
}

module.exports.createResult = (data, code = 101, message = '') => {
  return {
    code,
    data,
    message
  }
}

module.exports.createListResult = ({
  data,
  code = 101,
  total,
  offset = 0,
  limit = 10,
  message
}) => {
  let hasPrePage, hasNextPage, pageNum
  hasPrePage = offset - limit > 0
  hasNextPage = offset < total
  pageNum = Math.ceil((offset + 1) / limit)
  console.log(offset + 1)
  console.log(limit)
  return {
    code,
    data,
    total,
    offset,
    limit,
    hasPrePage,
    hasNextPage,
    pageNum,
    message
  }
}

exports.handleDate = (data, { floatKey }) => {}
