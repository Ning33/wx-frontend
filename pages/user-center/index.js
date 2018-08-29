const { StorageUtil } = require('../../utils/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户信息
    let user = StorageUtil.load('userInfo');
    //定义菜单栏
    let menuList = [{
      title: '个人信息',
      url: '/pages/user-center/person-detail',
      icon: '/style/images/icon-mail.png'
    }, {
      title: '我的事项',
      url: '/pages/service/service-tabs',
      icon: '/style/images/icon-mail.png'
    }, {
      title: '常用参保人',
      url: '/pages/user-center/person-list?mode=edit',
      icon: '/style/images/icon-mail.png'
    }];
    //未实名
    if (!(user&&user.isBoundIdcard)) {
      let confirmUser = {
        title: '实名认证',
        url: '/pages/user-center/user-binder',
        icon: '/style/images/icon-mail.png'
      }
      menuList.push(confirmUser);
    }
    this.setData({
      menuList: menuList
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
