const { grsfjyService } = require('../../../cgi/index.js');
const { getController } = require('../utils/controllers.js');
const controller = getController('grsfjy');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sbxx: {

    }
  },

  onLoad(options) {
    const personId = controller.serviceData.personId;
    grsfjyService.checkIn(personId).then(res => {
      this.setData({
        sbxx: res
      });
    })
  },

  /**
   * 下一步
   */
  handleNext() {
    controller.next();
  },

  handleBack(){
    wx.navigateBack({
      delta: 1
    });
  }
})