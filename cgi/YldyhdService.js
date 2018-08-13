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
     * 提交申报信息
     * @param personid
     */
  submitSbxx(personid){
    return this.request({
        urlPath: '/api/frontend/service/yldyhd/step-sbxx-submit',
        data: {
          personid: personid
        }
    })
  }

  /**
   * 查询参保情况确认信息
   */
  queryCbqkqr(orderno){
    return this.request({
        urlPath: '/api/frontend/service/yldyhd/step-cbqkqr-query',
        data:{
          orderno: orderno
        }
    })
  }

  /**
   * 查询发放账户确认信息
   */
  queryFfzhqr(orderno){
    return this.request({
      urlPath: '/api/frontend/service/yldyhd/step-ffzhqr-query',
      data: {
        orderno: orderno
      }
    })
  }

  /**
   * 提交申报
   */
  submit(orderno){
    return this.request({
      urlPath: '/api/frontend/service/yldyhd/submit',
      data: {
        orderno: orderno
      }
    })
  }
}

module.exports = YldyhdService;