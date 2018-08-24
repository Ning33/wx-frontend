const RestService = require('./RestService.js')

class DictService extends RestService{
  /**
   * 更新字典项
   */
  updateDict(version){
    return this.request({
      urlPath: "/api/frontend/dict/update",
      data: {
        version: version
      }
    });
  }
}

module.exports = DictService