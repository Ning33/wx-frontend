// pages/service/grsfjy/grsfjy-sbxx.js
const { getController } = require('../utils/controllers.js');
const { grsfjyService } = require('../../../cgi/index.js');
const { RouterUtil } = require('../../../utils/router.js');
const { ValidateType, ValidateStatus } = require('../../../components/form/Validator.js');
const controller = getController('grsfjy');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    sbxx: {

    },
    rules: {
      AAC003: [ValidateType.required],
      AAC004: [ValidateType.required],
      AAC002: [ValidateType.required],
      AAC006: [ValidateType.required],
    }
  },

  onLoad(options) {
    this.init();
  },

  /**
   * 注册页面返回事件
   */
  onNavigateBack(res) {
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
  init() {
    const { personId } = controller.serviceData;
    grsfjyService.checkIn(personId).then(res => {
      this.setData({
        sbxx: res
      })
    })
  },

  handleInput(event) {
    console.log(event);
    const field = event.target.id;
    const value = event.detail.value;
    this.setData({
      ['sbxx.' + field]: value
    })
  },

  /**
   * 下一步
   */
  handleNext(event) {
    const validateResult = event.detail;
    console.log(validateResult);
    if (validateResult.validateStatus === ValidateStatus.OK) {
      const personId = controller.serviceData.personId;
      //回写申报信息
      Object.assign(controller.serviceData, {
        sbxx: this.data.sbxx
      });
      controller.next();
    }
  }
})