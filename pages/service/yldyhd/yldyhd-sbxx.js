// pages/service/yldyhd/yldyhd-sbxx.js
const { getController } = require('../utils/controllers.js');
const { yldyhdService } = require('../../../cgi/index.js');
const { RouterUtil } = require('../../../utils/router.js');
const { ValidateType, ValidateStatus } = require('../../../components/form/Validator.js');
const controller = getController('yldyhd');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    sbxx: {

    },
    rules: {
      CAC031: [{ validateType: ValidateType.required, tips: '不允许为空' }],
      CAC542: [{ validateType: ValidateType.required, tips: '不允许为空' }],
      CIC520: [{ validateType: ValidateType.required, tips: '不允许为空' }],
      CAC554: [{ validateType: ValidateType.required, tips: '不允许为空' }],
      AAE005: [{ validateType: ValidateType.required, tips: '不允许为空' }],
      CAC552: [{ validateType: ValidateType.required, tips: '不允许为空' }],
      CAC551: [{ validateType: ValidateType.required, tips: '不允许为空' }],
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
    yldyhdService.checkIn(personId).then(res => {
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
  handleNext(validateResult) {
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