
const RestService = require('./RestService.js');

class PersonService extends RestService{

  /**
   * 查询人员列表
   */
  queryList(){
    return this.request({
      urlPath: '/api/frontend/user/person/query',
      data: {

      }
    })
  }

  /**
   * 添加参保人
   * @param userInfo.name
   * @param userInfo.idcard
   */
  bind(userInfo) {
    const { name, idcard } = userInfo;
    return this.request({
      urlPath: '/api/frontend/user/bind',
      data: {
        name, idcard
      }
    })
  }

  /**
   * 删除参保人
   * @param personid 人员ID
   */
  unbind(personid){
    return this.request({
      urlPath: '/api/frontend/user/unbind',
      data: {
        personid,
      }
    })
  }
}

module.exports = PersonService;