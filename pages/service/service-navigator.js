const {serviceItems} = require("../../cgi/index.js");
const {getController} = require('./utils/controllers.js');
let sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    scroll_height: 450, //初始滚屏的高度
    searchitems: [], //搜索的业务
    ZJYWitems: [],  //征缴业务
    YLDYitems: [],  //养老待遇
    GSDYitems: [],  //工伤待遇
    SYDYitems: [],  //失业待遇
    YLDY_YYitems: [], //医疗待遇
    searchValue: '',  //搜索框里获取值
    searchPanl: false , //搜索内容面板 隐藏
    serviceNum: [],  //分类后事项总数
    tabs: ["征缴业务", "养老待遇", "工伤待遇","失业待遇","医疗待遇"],
    img_src: ["./navigator-images/zjyw.png", "./navigator-images/yldy.png", "./navigator-images/gsdy.png", "./navigator-images/sydy.png", "./navigator-images/yldy_yy.png"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scroll_height: res.windowHeight - 185,
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    //查询事项数据 并分类
    that.seachAllItem();
  },
  //点击响应事件
  tabClick: function (e){
    var that = this;
    that.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      searchPanl: false, //隐藏搜索内容
      searchValue: '' // 清空搜索框
    });

  },
  //获取搜索框文本信息
  searchInput: function (e){
    this.setData({
      searchValue: e.detail.value
    })
  },
  //进行模糊查询
  searchConfirm: function (){
    //获取搜索框的值
    let searchValue_ = this.data.searchValue;
    //判断是否发送搜索请求
    if (searchValue_.length > 0 ){
      //进行搜索
      ServiceItems.queryServiceItemsByTitle(searchValue_).then((res)=>{
        var data = res;
        this.setData({
          //显示搜索内容
          searchPanl: true,
          searchitems: data
        });
      })
    }
   
  },

  //查询事项 并分类
  seachAllItem: function(){
    var that = this;
    serviceItems.queryServiceItems().then((res) => {
      var data = res;
      //对查询的事项数据进行分类
      var ZJYWitems = [];
      var YLDYitems = [];
      var GSDYitems = [];
      var SYDYitems = [];
      var YLDY_YYitems = [];
      //遍历所有事项 并分类
      for (let item of data) {
        if (item.catalog === 'bxgx') { //属于征缴业务
          ZJYWitems.push(item);
        } else if (item.catalog === 'yldy') { //属于养老待遇
          YLDYitems.push(item);
        } else if (item.catalog === 'gsdy') { //属于工伤待遇
          GSDYitems.push(item);
        } else if (item.catalog === 'syedy') { //属于失业待遇
          SYDYitems.push(item);
        } else if (item.catalog === 'yildy') { //属于医疗待遇
          YLDY_YYitems.push(item);
        }
      }

      that.setData({
        ZJYWitems: ZJYWitems,
        YLDYitems: YLDYitems,
        GSDYitems: GSDYitems,
        SYDYitems: SYDYitems,
        YLDY_YYitems: YLDY_YYitems,
        serviceNum: [ZJYWitems.length, YLDYitems.length, GSDYitems.length, SYDYitems.length, YLDY_YYitems.length] //计算分类后事项总数
      });
    });
  },

  handleNavigate(event){
    console.log(event.currentTarget);
    const target = event.currentTarget;
    const serviceName = target.dataset.serviceName;
    const controller = getController(serviceName);
    controller.start();

  }
  
})