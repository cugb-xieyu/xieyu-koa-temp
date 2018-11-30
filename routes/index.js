const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index.njk', {
    title: 'element'
  })
})

module.exports = router
