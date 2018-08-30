const { StorageUtil } = require('../../utils/index.js');
const { SecurityLevel } = require('../../constant/constant.js');
const { realNameFilter } = require('../service/utils/ServiceFilter.js');

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
      icon: '/style/images/icon-mail.png',
      securityLevel: SecurityLevel.REAL_NAME
    }, {
      title: '我的事项',
      url: '/pages/service/service-tabs',
      icon: '/style/images/icon-mail.png',
      securityLevel: SecurityLevel.REAL_NAME
    }, {
      title: '常用参保人',
      url: '/pages/user-center/person-list?mode=edit',
      icon: '/style/images/icon-mail.png',
      securityLevel: SecurityLevel.REAL_NAME
    }];
    //未实名
    if (!(user&&user.isBoundIdcard)) {
      let confirmUser = {
        title: '实名认证',
        url: '/pages/user-center/user-binder',
        icon: '/style/images/icon-mail.png',
        securityLevel: SecurityLevel.REAL_NAME
      }
      menuList.push(confirmUser);
    }
    this.setData({
      menuList: menuList
    })

  },
  // 菜单点击事件
  handleMenuTap(event){
    const {url,securityLevel} = event.currentTarget.dataset.item;
    if(securityLevel >= SecurityLevel.REAL_NAME){
      realNameFilter.doFilter().then(res=>{
        const {result} = res;
        if(result){
          wx.navigateTo({
            url: url
          })
        }
      })
    }
  }
})
