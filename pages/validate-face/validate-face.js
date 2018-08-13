// pages/validate-face/validate-face.js
const { validateFace:validateFaceConfig} = require('../../constant/config.js');
const { request, StorageUtil} = require('../../utils/index.js');
const {validateFaceService} = require('../../cgi/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetAppid: validateFaceConfig.targetAppid,
    targetVersion: validateFaceConfig.version,
    extraData: {
      appid: validateFaceConfig.appid,
      uid: '',//openid,从sessionStorage中读取
      id_name: '',//姓名，上一页面传入
      id_number: '',//身份证号，上一页面传入
      scene: validateFaceConfig.scene,
      signature: '',//后台实时生成
    },
    enableValidateFace: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      'extraData.id_name': options.name,
      'extraData.id_number': options.idcard
    });
    this.refreshSignature();
  },
  /**
   * 刷新signature
   */
  refreshSignature(){
    this.setData({
      enableValidateFace: false
    });
    return validateFaceService.signature().then(signature => {
      console.log('signature callback');
      const userInfo = StorageUtil.loadUserInfo();
      this.setData({
        'extraData.signature': signature,
        'extraData.uid': userInfo.openid,
        enableValidateFace: true,
      });
      return signature;
    })
  }
})