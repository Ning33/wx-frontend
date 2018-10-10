const { DictUtil, StorageUtil } = require('../../utils/index.js');
const { personDetail } = require('../../cgi/index.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personInfo:{},
    array:[
      {
        dictValue: "0",
        dictDisplay: "未选择"
      },
      {
        dictValue: "10",
        dictDisplay: "男"
      },
      {
        dictValue: "20",
        dictDisplay: "女"
      }
    ],
    value: 0, //字典值
    index: 0, //下标
    multValue: [], //多选择数组--字典值
    multIndex:[0,0],
    multArray: [
      [
        {
          dictValue: 10,
          name: '无脊动物'
        },
        {
          dictValue: 11,
          name: '脊柱动物'
        }
      ], [
        {
          dictValue: 20,
          name: '扁性动物'
        },
        {
          dictValue: 21,
          name: '线形动物'
        },
        {
          dictValue: 22,
          name: '环节动物'
        }
      ]
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //首先获取传值过来的personId
    let personId = options.personId;
    if(personId === "" || personId === undefined){
      let userInfo = StorageUtil.load('userInfo');
      personId = userInfo.personId;
    }

    //查询个人信息
    personDetail.queryPersonDetail(personId).then((personInfo)=>{
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

  handleChange: function (e) {
    console.log(e.detail);
    this.setData({
      multIndex: e.detail.value,
     // value: e.detail.dictValue
    });
  },
  handleTouchCancel: function (e) {
    console.log(e.detail.value)
    console.log("已关闭")
  },
  handleColumnChange: function (e) {
    // console.log(e.detail.column);
    // console.log(e.detail.value);
  }
})