const Axios = require('axios')
const interceptors = require('./interceptors')
const apiAddress = require('../config').API_ROOT

let http = Axios.create({
  baseURL: apiAddress,
  timeout: 5000
})
http.defaults.headers.post['Content-Type'] = 'application/json'
interceptors(http)

module.exports = http
