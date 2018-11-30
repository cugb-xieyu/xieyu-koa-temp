const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const Template = require('./engine')

const index = require('./routes/index')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: [ 'json', 'form', 'text' ]
}))
app.use(json())
app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))

// add nunjucks
const isProduction = app.env === 'production'
const EngineInstant = new Template('/views', {
  noCache: !isProduction,
  watch: !isProduction
})
EngineInstant.connect(app)
// app.use(views(__dirname + '/views', {
//   extension: 'nunjucks'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
