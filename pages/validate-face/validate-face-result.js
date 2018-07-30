// pages/validate-face/validate-face-result.js
const {StorageUtil} = require('../../utils/storage.js');
const {validateFaceService} = require('../../cgi/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    idcard: '',
    name: '',
    isSuccess: false,
    errcode: '',
    errmsg: '',
    token: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { isSuccess, token, errcode, errmsg, idcard, name } = JSON.parse(options.query);
    this.setData({
      isSuccess,
      token,
      errcode,
      errmsg,
      idcard,
      name,
    });
    
    //人脸成功，保存token
    if(isSuccess){

      //保存token至前端
      StorageUtil.saveValidateFaceToken(idcard,token);

      //保存token至后端
      validateFaceService.saveToken(token).catch(res=>{
        //保存失败，请重新人脸识别
        this.setData({
          isSuccess: false,
          errcode: null,
          errmsg: null,
        })
      });
      
    }else{
      //人脸失败
      
    }
  },

  handleRetry(){
    const {name,idcard} = this.data;
    wx.redirectTo({
      url: '/pages/validate-face/validate-face?name=' + name + '&idcard=' + idcard,
    })
  },

  handleBack(){
    wx.navigateBack();
  } 
})