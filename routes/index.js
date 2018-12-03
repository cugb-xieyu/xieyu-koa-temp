const router = require('koa-router')()
const indexModel = require('../models/index-model')

router.get('/', async (ctx, next) => {
  try {
    let indexData = await indexModel.indexHelloModel()
    await ctx.render('index.njk', indexData)
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = err.message
    ctx.app.emit('error', err, ctx)
  }
})

module.exports = router
