// pages/service/yldyhd/yldyhd-sbxx.js
const { getController } = require('../utils/controllers.js');
const { RouterUtil } = require('../../../utils/index.js');
const {yldyhdService} = require('../../../cgi/index.js');
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
    this.init();
  },

  onNavigateBack(res){
    const {type,data} = res;
    switch(type){
      case RouterUtil.navigateBackType.validateFace:{
        break;
      }
      // 参保人列表选择
      case RouterUtil.navigateBackType.personSelect:{
        const personid = data.personid;
        controller.serviceData.personid = personid;
        // 根据人员，读取数据
        // TODO
        this.init();
        break;
      }
    }
  },

  /**
   * 初始化方法
   * 进行通用校验，并调用业务校验初始化页面数据
   */
  init(){
    controller.handleFilters(this).then(res=>{
      const {result,data} = res;
      const personid = controller.serviceData.personid;
      if(result){
        yldyhdService.checkIn(personid).then(res => {
          this.setData({
            res: res
          })
        })
      }
    })
   
  },

  /**
   * 下一步
   */
  handleNext() {
    const personid = controller.serviceData.personid;
    yldyhdService.submitSbxx(personid).then(orderno=>{
      // 回写受理单号
      controller.serviceData.orderno = orderno;
      controller.next({orderno:orderno});
    })
    
  }
})