const RestService = require("./RestService.js");

class MyService extends RestService{

/**
 * 获取办理事项
 */
  searchServices(status){
    return this.request({
      urlPath: "/api/frontend/myservice/searchServices",
      data:{
        status: status
       }
    });
  }
/**
 * 根据单号查询事项
 */
  getMyServiceByOrderNo(orderNo){
    return this.request({
      urlPath:"/api/frontend/myservice/queryMyServiceByOrderNo",
      data:{
        orderNo: orderNo
      }
    });
  }
}

module.exports = MyService