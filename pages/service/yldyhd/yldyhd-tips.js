// pages/service/yldyhd/yldyhd-tips.js
const {getController} = require('../utils/controllers.js');
const controller = getController('yldyhd');

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 下一步
   */
  handleNext(){
    controller.next();
  }
})