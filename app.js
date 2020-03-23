var createError = require('http-errors')
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
var app = express()

// view engine setup

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 验证token
// app.use(verifyToken)
app.use(parseQuery)

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/chip', chipRouter)
app.use('/product', productRouter)
app.use('/project', projectRouter)
app.use('/development', developmentRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  next(createError(err))

  // res.locals.message = err.message
  // res.locals.error = req.app.get('env') === 'development' ? err : {}

  // // render the error page
  // res.status(err.status || 500)
  // res.render('error')
})

module.exports = app
