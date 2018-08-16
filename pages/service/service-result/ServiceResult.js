const { myService } = require("../../../cgi/index.js");
const { p_utils } = require("../../../utils/index.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    createdTime: 0, //初始化时间
    result: {} //办理结果数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //根据受理单号查询数据
    myService.getMyServiceByOrderNo(options.orderno).then((res)=>{
      let createdTime = p_utils.formatDate(res.createdTime);
      this.setData({
        result: res,
        createdTime: createdTime
      });
    
    });
  },
  /**
   * 查看订单详细信息
   */
  showDetail: function(e){
    //待做
  }
})