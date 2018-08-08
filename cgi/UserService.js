const RestService = require('./RestService.js');

class UserService extends RestService{
  
  /**
   * 注册
   * @param userInfo.name
   * @param userInfo.idcard
   */
  register(userInfo){
    const {name,idcard} = userInfo;
    return this.request({
      urlPath: '/api/frontend/user/register',
      data:{
        name,idcard
      }
    })
  }
}

module.exports = UserService