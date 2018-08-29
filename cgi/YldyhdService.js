const RestService = require('./RestService.js');

class YldyhdService extends RestService{

  /**
   * 业务校验
   */
  checkIn(personId){
    return this.request({
      urlPath: '/api/frontend/service/yldyhd/check-in',
      data: {
        personId: personId
      }
    })
  }

  /**
   * 查询参保情况确认信息
   */
  queryCbqkqr(personId){
    return this.request({
        urlPath: '/api/frontend/service/yldyhd/step-cbqkqr-query',
        data:{
          personId: personId
        }
    })
  }

  /**
   * 查询发放账户确认信息
   */
  queryFfzhqr(personId){
    return this.request({
      urlPath: '/api/frontend/service/yldyhd/step-ffzhqr-query',
      data: {
        personId: personId
      }
    })
  }

  /**
   * 提交申报
   */
  submit(personId,sbxx){
    return this.request({
      urlPath: '/api/frontend/service/yldyhd/submit',
      method: 'POST',
      data: {
        personId: personId,
        ...sbxx
      }
    })
  }
}

module.exports = YldyhdService;