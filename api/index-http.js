
const http = require('./base-http')

module.exports = {
  // POST
  caseListApi: data => http({ method: 'POST', url: '/api/XiLifeNDC/getCaseList', data }),
  helloApi: () => {
    return Promise.resolve(
      {
        title: 'MyTitle'
      }
    )
  }
}
