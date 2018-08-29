const RestService = require('./RestService.js')

class PersonDetail extends RestService{
  //根据personid 查询个人详细信息
  queryPersonDetail(personid){
    return this.request({
      urlPath: "/api/frontend/person/personDetail",
      data:{
        personid: personid
      }
    });
  }
}
module.exports = PersonDetail