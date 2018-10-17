// pages/service/grsfjy/grsfjy-tips.js
const { getController } = require('../utils/controllers.js');
const controller = getController('grsfjy');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 下一步
   */
  handleNext() {
    controller.next();
  }
})