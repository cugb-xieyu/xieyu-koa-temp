const nodepath = require('path')
const Nunjucks = require('nunjucks')
const { XButtonStyle, XButtonPrimary, XButtonGhost } = require('xilife-design-test')

class Template {
  constructor (path = '/views', opts) {
    this.path = path
    this.path = nodepath.join(__dirname, this.path)
    this.noCache = opts.noCache || false
    this.watch = opts.watch || false
    this.autoescape = opts.autoescape || true
    this.throwOnUndefined = opts.throwOnUndefined || false
    this.filters = opts.filters
  }

  static currying (fn) {
    let outerArgs = Array.prototype.slice.call(arguments, 1)
    return function () {
      let innerArgs = Array.prototype.slice.call(arguments)

      let finalArgs = outerArgs.concat(innerArgs)
      return fn.apply(null, finalArgs)
    }
  }

  createNjk () {
    const env = new Nunjucks.Environment(
      new Nunjucks.FileSystemLoader(this.path, {
        noCache: this.noCache,
        watch: this.watch
      }),
      {
        autoescape: this.autoescape,
        throwOnUndefined: this.throwOnUndefined
      }
    )
    if (this.filters) {
      Object.keys(this.filters).forEach(k => {
        env.addFilter(k, this.filters[k])
      })
    }

    return env
  }

  addDesignElement (env) {
    env.addGlobal('XButtonStyle', XButtonStyle)
    env.addGlobal('XButtonPrimary', XButtonPrimary)
    env.addGlobal('XButtonGhost', XButtonGhost)
  }

  connect (app) {
    let env = this.createNjk()
    this.addDesignElement(env)
    app.context.render = function (view, model) {
      this.response.body = env.render(view, Object.assign({}, this.state || {}, model || {}))
      this.response.type = 'text/html'
    }
  }
}

module.exports = Template