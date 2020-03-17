const pool = require('../db/pool')
const page = params => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      connection.query('select * from t_user', (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(JSON.stringify(result)))
        }
        connection.release()
      })
    })
  })
}
const GetUserByUserNameAndPw = params => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      connection.query(
        'select * from t_user where username=? and password=?',
        [params.username, params.password],
        (err, result) => {
          if (err) {
            reject(err)
          } else {
            result = JSON.parse(JSON.stringify(result))
            resolve(result[0])
          }
          connection.release()
        }
      )
    })
  })
}

module.exports = {
  page,
  GetUserByUserNameAndPw
}
