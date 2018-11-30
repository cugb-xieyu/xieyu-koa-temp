
// const APP_SRC = __dirname

// console.log(APP_SRC)

// module.exports = {
//   APP_SRC
// }
const path = require('path')

global.APP_ROOT = path.resolve(__dirname, './')

global.APP_MODE = process.env.NODE_ENV || 'dev'

if (global.APP_MODE === 'production') {
  global.API_ROOT = 'https://xeo2.xique.com:8001'
  global.Test_STATIC_BASE = 'https://xeo2.xique.com:8081/images/NDC'
} else {
  global.API_ROOT = 'http://192.168.16.150:8000'
  global.Test_STATIC_BASE = 'http://192.168.16.150:8080/images/NDC'
}
