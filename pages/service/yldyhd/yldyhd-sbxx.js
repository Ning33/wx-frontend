// pages/service/yldyhd/yldyhd-sbxx.js
const { getController } = require('../utils/controllers.js');
const {yldyhdService} = require('../../../cgi/index.js');
const { RouterUtil } = require('../../../utils/router.js');
const controller = getController('yldyhd');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    sbxx: {

    }
  },

  onLoad(options){
    this.init();
  },

  /**
   * 注册页面返回事件
   */
  onNavigateBack(res){
    const { type, data } = res;
    switch (type) {
      case RouterUtil.navigateBackType.validateFace: {
        this.init();
        break;
      }
    }
  },

  /**
   * 初始化数据
   */
  init(){
    const { personid } = controller.serviceData;
    yldyhdService.checkIn(personid).then(res => {
      this.setData({
        sbxx: res
      })
    })
  },

  handleInput(event){
    console.log(event);
    const {field} = event.target.dataset;
    const value = event.detail.value;
    this.setData({
      ['sbxx.'+field]: value
    })
  },

  /**
   * 下一步
   */
  handleNext() {
    const personid = controller.serviceData.personid;
    //回写申报信息
    Object.assign(controller.serviceData,{
      sbxx: this.data.sbxx
    });
    controller.next();
  }
})