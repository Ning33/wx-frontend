const { myService } = require("../../cgi/index.js");
const {p_utils} = require('../../utils/index.js');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    scroll_height: 450, //初始滚屏的高度
    failedItem: [],   //失败事项
    failedFlag: 0 , //是否拉取失败事项 0:未拉取 1:已拉取
    successItem: [],  //成功事项
    successFlag: 0, //是否拉取成功事项 0:未拉取 1:已拉取
    processItem: [],  //办理中事项
    tabs: ["办理中", "办理成功", "办理失败"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scroll_height: res.windowHeight - 65,
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
        });
      }
    });

    /**
     * 查询 办理中的事项
     */
    that.searchServices('10');
  },

  tabClick: function (e) {
    var that = this;
    that.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    //拉取成功事项
    if (e.currentTarget.id === '1' && that.data.successFlag === 0 ){
      that.searchServices('21');
    }
    //拉取成功事项
    if (e.currentTarget.id === '2' && that.data.failedFlag === 0) {
      that.searchServices('22');
    }
    
  },
  /**
   * 拉取事项 
   */
  searchServices: function(status){
    //根据status获得对应事项 
      myService.searchServices(status).then((res) => {
        let data = res;
        let services = [];  //查询出来的事项
        for(let service of data){
          //解决日期显示问题
          service.updatedTime = p_utils.formatDate(service.updatedTime);
          services.push(service);
        }
        if(data[0].status === '10'){ //办理中事项
          this.setData({
            processItem: services
          });
        }
        if (data[0].status === '21') { //办理成功事项
          this.setData({
            successItem: services,
            successFlag: 1
          });
        }
        if (data[0].status === '22') { //办理失败事项
          this.setData({
            failedItem: services,
            failedFlag: 1
          });
        }

      });
  },
  
//跳转到详细信息
toDetail: function(e){
  let orderNo = e.currentTarget.id;
  wx.navigateTo({
    url: './service-result/ServiceResult?orderNo=' + orderNo,
  })
}

});