const RestService = require('./RestService.js');

class ValidateFaceService extends RestService{

  /**
   * 签名
   */
  signature(apiName='appauth'){
    return this.request({
      urlPath: '/api/frontend/validateFace/signature',
      data: {
        apiName: apiName
      }
    })
  }

  /**
   * 保存token
   */
  saveToken(token){
    return this.request({
      urlPath: '/api/frontend/validateFace/saveToken',
      data: {
        token: token
      }
    });
  }
}

module.exports = ValidateFaceService;