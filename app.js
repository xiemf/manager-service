var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const verifyToken = require('./middleware/verifyToken')
const parseQuery = require('./middleware/parseQuery')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
const chipRouter = require('./routes/chip')
const productRouter = require('./routes/product')
const projectRouter = require('./routes/project')
const developmentRouter = require('./routes/development')
const testRouter = require('./routes/test')
const roleRouter = require('./routes/role')
const userRoleRouter = require('./routes/userRole')
const privilegeRouter = require('./routes/privilege')
const rolePrivilegeRouter = require('./routes/rolePrivilege')

const { createError, createResult } = require('./util')
var app = express()

// view engine setup

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 验证token
app.use(verifyToken)
app.use(parseQuery)

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/chip', chipRouter)
app.use('/product', productRouter)
app.use('/project', projectRouter)
app.use('/development', developmentRouter)
app.use('/test', testRouter)
app.use('/role', roleRouter)
app.use('/userRole', userRoleRouter)
app.use('/privilege', privilegeRouter)
app.use('/rolePrivilege', rolePrivilegeRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404)
  res.send(createResult(req.path,0,'路径未找到'))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // next(createError(err))
  res.send(createError(err))
  // res.locals.message = err.message
  // res.locals.error = req.app.get('env') === 'development' ? err : {}

  // // render the error page
  // res.status(err.status || 500)
  // res.render('error')
})

module.exports = app
