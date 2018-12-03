
const indexApi = require(`../api/index-http`)

module.exports = {
  indexHelloModel (param) {
    return new Promise((resolve, reject) => {
      indexApi.helloApi()
        // .then(response => response.data)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
