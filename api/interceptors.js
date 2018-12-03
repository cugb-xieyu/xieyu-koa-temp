const _ = require('lodash')

module.exports = function (axios) {
  //拦截请求
  axios.interceptors.request.use(function (config) {
    //  omit field which is null
    if (config.data) {
      config.data = _.omitBy(config.data, val => _.isNil(val) || val === '')
    }
    if (config.params) {
      config.params = _.omitBy(config.params, val => _.isNil(val) || val === '')
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })
  //拦截响应
  axios.interceptors.response.use(function (response) {
    if(response.status > 399) {
      return Promise.reject(new Error('Interal server error'))
    }
    else {
      return response
    }
  }, function (error) {
    return Promise.reject(error)
  })
}