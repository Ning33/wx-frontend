const RestService = require("./RestService.js");

class ServiceItems extends RestService{

  /**
   * 查询所有业务事项
   */
  queryServiceItems(){
    return this.request({
      urlPath: '/api/frontend/serviceItems/queryAllItems',
      data: { }
    })
  }
  
  /**
   * 根据名称模糊查询事项
   */
  queryServiceItemsByTitle(title){
    return this.request({
      urlPath: '/api/frontend/serviceItems/queryItemByTitle',
      data:{
        title: title
      }
    });
  }
  /**
   * 查询所有分类
   */
  queryAllServiceCatalog(){
    return this.request({
      urlPath: '/api/frontend/serviceItems/queryAllCatalog',
      data: {

      }
    });
  }
}


module.exports = ServiceItems