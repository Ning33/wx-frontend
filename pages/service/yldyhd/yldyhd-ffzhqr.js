// pages/service/yldyhd/yldyhd-ffzhqr.js
const { getController } = require('../utils/controllers.js');
const { yldyhdService } = require('../../../cgi/index.js');
const controller = getController('yldyhd');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: {

    }
  },

  onLoad(options){
    yldyhdService.queryFfzhqr(controller.serviceData.orderno).then(res=>{
      this.setData({
        res: res
      })
    });
  },

  /**
   * 下一步
   */
  handleNext() {
    controller.next();
  }
})