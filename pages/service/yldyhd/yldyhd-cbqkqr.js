// pages/service/yldyhd/yldyhd-cbqkqr.js
const {yldyhdService} = require('../../../cgi/index.js');
const { getController } = require('../utils/controllers.js');
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
    const orderno = controller.serviceData.orderno;
    yldyhdService.queryCbqkqr(orderno).then(res=>{
      this.setData({
          res:res
      });
    })
  },

  /**
   * 下一步
   */
  handleNext() {
    controller.next();
  }
})