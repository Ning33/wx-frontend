// pages/user-center/person-list.js
const {personService} = require('../../cgi/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    personList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    personService.queryList().then(personList=>{
      this.setData({
        personList: personList
      })
    });
  },

  handleBindPerson(){
    wx.navigateTo({
      url: '/pages/user-center/user-binder?isSelf=false',
    })
  }
})