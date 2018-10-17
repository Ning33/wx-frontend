const RestService = require('./RestService.js');

class GrsfjyService extends RestService {
  
  /**
   * 业务校验
   */
  checkIn(personId){
    return this.request({
      urlPath: '/api/frontend/service/grsfjy/checkIn',
      data: {
        personId: personId
      }
    })
  }

  /**
   * 提交申报
   */
  submit(personId, attachFiles) {
    return this.request({
      urlPath: '/api/frontend/service/grsfjy/submit',
      method: 'POST',
      data: {
        personId: personId,
        ...attachFiles
      }
    })
  }
}

module.exports = GrsfjyService;