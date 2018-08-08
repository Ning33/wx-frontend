const {StorageUtil} = require('../../utils/storage.js');
const {userService,personService} = require('../../cgi/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    enableAutoSubmit: false,
    isSelf: true,//默认为本人
    name: '',
    idcard: '',
  },

  onLoad(options){
    //判断是否添加本人,默认本人
    let isSelf = options.isSelf;
    if(isSelf == 'false'){
      isSelf = false;
    }else{
      isSelf = true;
    }
    this.setData({
      isSelf: isSelf
    });
    
  },

  onShow(){
    //如果从人脸识别界面回退，则自动点击下一步按钮
    // 判断标准：
    // 0.允许自动提交
    // 1.人脸识别storage中有值
    // 2.表单填写完毕
    // 3.证件号码和人脸识别信息一致
    const {enableAutoSubmit,idcard,name} = this.data;
    if(enableAutoSubmit){
      if (idcard && name) {
        const token = StorageUtil.loadValidateFaceToken(idcard);
        if(token){
          //自动提交,点击下一步
          this.handleSubmit();
        }
      }
    }
    
  },

  handleInput: function (event) {
    const input = event.detail.value;
    const field = event.target.dataset.field;
    this.setData({
      [field]: input
    });
  },

  handleSubmit: function(event){
    const {name,idcard,isSelf} = this.data;

    //校验暂时使用弹出框的形式，后续改为form校验
    if( !name || !idcard ){
      return wx.showToast({
        title: '请输入个人信息',
        icon: 'none'
      })
    }

    //基础校验通过，设置允许自动提交
    this.setData({
      enableAutoSubmit: true
    });

    //校验是否已完成人脸识别
    const token = StorageUtil.loadValidateFaceToken(idcard)
    if(!token){
      return wx.navigateTo({
        url: `/pages/validate-face/validate-face?idcard=${idcard}&name=${name}`
      })
    }


    if(isSelf){
      userService.register({ name, idcard }).then(user => {
        //回写如用户信息
        StorageUtil.saveUserInfo(user).then(() => {
          //跳转至成功提示页
          wx.redirectTo({
            // url: '/pages/user-center/user-binder-success',
            url: '/pages/demo/result-success'
          })
        })
      });
    }else{
      personService.bind({name,idcard}).then(person=>{
        //跳转至成功提示页
        wx.redirectTo({
          // url: '/pages/user-center/user-binder-success',
          url: '/pages/demo/result-success'
        })
      })
    }
        
  }
})