const RestService = require('./RestService.js');

class YldyhdService extends RestService{

  /**
   * 业务校验
   */
  checkIn(personid){
    return this.request({
      urlPath: '/api/frontend/service/yldyhd/check-in',
      data: {
        personid: personid
      }
    })
  }

  /**
   * 查询参保情况确认信息
   */
  queryCbqkqr(personid){
    return this.request({
        urlPath: '/api/frontend/service/yldyhd/step-cbqkqr-query',
        data:{
          personid: personid
        }
    })
  }

  /**
   * 查询发放账户确认信息
   */
  queryFfzhqr(personid){
    return this.request({
      urlPath: '/api/frontend/service/yldyhd/step-ffzhqr-query',
      data: {
        personid: personid
      }
    })
  }

  /**
   * 提交申报
   */
  submit(personid,sbxx){
    return this.request({
      urlPath: '/api/frontend/service/yldyhd/submit',
      method: 'POST',
      data: {
        personid: personid,
        ...sbxx
      }
    })
  }
}

module.exports = YldyhdService;