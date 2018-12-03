
// const APP_SRC = __dirname

// console.log(APP_SRC)

// module.exports = {
//   APP_SRC
// }
const path = require('path')

global.APP_ROOT = path.resolve(__dirname, './')

let APP_MODE = process.env.NODE_ENV || 'dev'

let ROOTS = {}

if (APP_MODE === 'production') {
  ROOTS.API_ROOT = 'http://my.data.com:8000'
  ROOTS.STATIC_ROOT = 'http://my.data.com:8001'
} else {
  ROOTS.API_ROOT = 'http://localhost:8000'
  ROOTS.STATIC_ROOT = 'http://localhost:8001'
}

module.exports = ROOTS
