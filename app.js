//app.js
const {request} = require('./utils/index.js');
const {login} = require('./utils/request.js');
const {validateFace:validateFaceConfig} = require('./constant/config.js');

App({
  onLaunch: function(){
    
  },
  onShow: function(options){
    console.log('app.onShow:', options);
    // 如果触发该函数的场景为从另一个小程序返回
    if(options.scene == 1038){
      // 这里可以确保这里有options.referrerInfo.appId 参数
      // 判断是否是从慧眼业务小程序返回到该小程序，业务小程序可能会跳转调用到多个小程序
      if (options.referrerInfo.appId === validateFaceConfig.targetAppid && options.path === 'pages/validate-face/validate-face'){
        // 已确定是从慧眼业务小程序返回
        let isSuccess = false;
        let token, errcode, errmsg;
        if (options.referrerInfo.extraData) {
          const extraData = options.referrerInfo.extraData;
          if(extraData.error_code){
            //验证失败
            isSuccess = false;
            token = extraData.token;
            errcode = extraData.error_code;
            errmsg = extraData.error_msg;
          }else{
            //验证成功
            isSuccess = true;
            token = extraData.token;
          }
        }else{
          // 异常退出或直接关闭了慧眼业务小程序
          isSuccess = false;
        }
        const { idcard, name } = options.query;
        const query = {
          isSuccess,token,errcode,errmsg,idcard,name
        };
        wx.redirectTo({
          url: `/pages/validate-face/validate-face-result?query=${JSON.stringify(query)}`
        })
      }
    }
  },
  globalData: {
    userInfo: null
  }
})