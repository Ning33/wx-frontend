// pages/service/yldyhd/yldyhd-cbqkqr.js
const {yldyhdService} = require('../../../cgi/index.js');
const { getController } = require('../utils/controllers.js');
const controller = getController('yldyhd');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cbqkqr: {

    }
  },

  onLoad(options){
    const personid = controller.serviceData.personid;
    yldyhdService.queryCbqkqr(personid).then(res=>{
      this.setData({
        cbqkqr:res
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