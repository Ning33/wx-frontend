const { DictUtil, StorageUtil } = require('../../utils/index.js');
const { personDetail } = require('../../cgi/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personInfo:{}
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //首先获取传值过来的personid
    let personid = options.personid;
    if(personid === "" || personid === undefined){
      let userInfo = StorageUtil.load('userInfo');
      personid = userInfo.personid;
    }

    //查询个人信息
    personDetail.queryPersonDetail(personid).then((personInfo)=>{
      //字段为空转换
      if (personInfo.birthday === null || personInfo.birthday === ""){
        personInfo.birthday = "暂无信息";
      }
      if (personInfo.address === null || personInfo.address === "") {
        personInfo.address = "暂无信息";
      }
      if (personInfo.tel === null || personInfo.tel === "") {
        personInfo.tel = "暂无信息";
      }
     
      //转换字典项
      if (personInfo.sex === null || personInfo.sex === ""){
        personInfo.sex = "暂无信息";
      }else{
        let sex = DictUtil.getDisplay('性别',personInfo.sex);
        personInfo.sex = sex;
      }

      this.setData({
        personInfo: personInfo
      });
    });
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