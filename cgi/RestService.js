const { request } = require('../utils/request.js');

class RestService {

  isMock = false;
  /**
   * 传递request公共方法
   */
  request(options){
    return request(options)
  }
}

module.exports = RestService;