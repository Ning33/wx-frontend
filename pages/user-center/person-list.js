// pages/user-center/person-list.js
const {personService} = require('../../cgi/index.js');
const {RouterUtil} = require('../../utils/index.js');

// 页面同时支持两种模式-选择、编辑
class Mode{
  static select = 'select';
  static edit = 'edit';
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: Mode.select,
    personList: [],//注意，本人始终为第一个
  },

  onLoad(options){
    let {mode} = options;
    //默认模式为选择
    if (!Object.values(Mode).includes(mode)){
      mode = Mode.select;
    }

    // 设置后续跳转
    this.setData({
      mode: mode
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    personService.queryList().then(personList=>{
      for(let i=0;i<personList.length;i++){
        const person = personList[i];
        if(person.isSelf){
          this.setData({
            personList: personList.splice(i, 1).concat(personList)
          })
          break;
        }
      }
    });
  },

  // 添加参保人，跳转到具体的页面处理
  handleBindPerson(){
    wx.navigateTo({
      url: '/pages/user-center/user-binder?isSelf=false',
    })
  },
  // 点击人员列表，根据模式选择后续处理
  handleSelectRow(event){
    const {mode} = this.data;
    const {personid:personId,name,idcard} = event.currentTarget.dataset;
    switch(mode){
      // 选择参保人模式，点击跳转至后续业务,并传入personId
      case Mode.select:{
        //向上一页面传值
        RouterUtil.navigateBack({
          type: RouterUtil.navigateBackType.personSelect,
          data: {
            personId: personId,
            idcard: idcard,
            name: name,
          }
        })
        
        break;
      }
      // 编辑参保人模式,点击跳转至人员详细信息页面
      case Mode.edit:{
        wx.navigateTo({
          url: '/pages/user-center/person-detail?personId='+personId,
        });
        break;
      }
    }
  }
})