var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var routes = require('./routes')
var models = require('./models')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1]
  }
  next()
})

app.use('/session', routes.session)
app.use('/users', routes.user)
app.use('/messages', routes.message)

app.get('/', (req, res) => {
  return res.send('Recieved a GET HTTP method')
})
app.post('/', (req, res) => {
  return res.send('Recieved a POST HTTP method')
})
app.put('/', (req, res) => {
  return res.send('Recieved a PUT HTTP method')
})
app.delete('/', (req, res) => {
  return res.send('Recieved a DELETE HTTP method')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
