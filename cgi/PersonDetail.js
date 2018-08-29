const RestService = require('./RestService.js');

class PersonDetail extends RestService{
  //根据personId 查询个人详细信息
  queryPersonDetail(personId){
    return this.request({
      urlPath: "/api/frontend/person/personDetail",
      data:{
        personId: personId
      }
    });
  }
}
module.exports = PersonDetail