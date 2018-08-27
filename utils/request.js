const { urlPrefix } = require('../constant/config.js');
const { StorageUtil } = require('./storage.js');
const responseStatus = require('../constant/responseStatus.js');



/**
 * 接入网关request
 * @param {Object} options
 * @param {string} options.urlPath 请求接口路径
 */
function customRequest(options,retryCnt=1) {
  const defaultOptions = {
    urlPrefix: urlPrefix, 
    needLogin: true,
    method: 'GET',
  };
  const customOptions = Object.assign({},defaultOptions,options);

  return new Promise((resolve, reject) => {

    const {needLogin} = customOptions;

    wx.showLoading({
      title: '努力加载中...',
      mask: true,
      complete: () => {
        //wx.request的options
        const requestOptions = {
          url: customOptions.urlPrefix + customOptions.urlPath,
          data: customOptions.data,
          method: customOptions.method,
          header: {},
          success: (res) => {
            wx.hideLoading();
            const { statusCode, errMsg, data } = res;
            switch(statusCode){
              //返回值正常
              case 200:{
                switch(res.data.errcode){
                  case responseStatus.OK:{
                    return resolve(res.data.data);
                  }
                  // 数据校验异常，需要弹出提示信息
                  case responseStatus.DATA_VALIDATE_EXCEPTION:{
                    wx.showToast({
                      title: res.data.errmsg,
                      icon: 'none',
                      duration: 2000
                    });
                    break;
                  }
                  // 前端调用微信登录的js_code无效
                  case responseStatus.JS_CODE_INVALID:
                  // 微信登录的sessionKey已过期
                  case responseStatus.SESSION_WX_EXPIRED:
                  // 网关发放的sessionid过期
                  case responseStatus.SESSION_GATEWAY_EXPIRED:{
                    if(retryCnt < 3){
                      return login().then(() => customRequest(options, retryCnt+1).then(res=>resolve(res)).catch(res=>reject(res)));
                    }
                    // 已超出重试次数，直接抛异常，不再重试
                    return handleException(reject,res);
                  }
                  //未实名用户，提醒完成实名
                  case responseStatus.UNBOUND_USER:{
                    return wx.showModal({
                      title: '温馨提示',
                      content: '请先完成实名用户绑定',
                      success: (res)=>{
                        const {confirm} = res;
                        if(confirm){
                          wx.navigateTo({
                            url: '/pages/user-center/user-binder',
                          })
                        }
                      }
                    });
                  }
                  // 人脸token过期,跳转至人脸识别页面
                  case responseStatus.VALIDATE_FACE_EXPIRED: {
                    //前端删除对应的人脸识别token
                    const {idcard,name} = res.data.data;
                    StorageUtil.clearValidateFaceToken(idcard);
                    return wx.navigateTo({
                      url: `/pages/validate-face/validate-face?name=${name}&idcard=${idcard}`,
                    });
                  }
                  default: {
                    return handleException(reject, res);
                  }
                }
                break;
              }
              //请求量超出限额
              case 429:
              default: return handleException(reject, res);
            }
          },
          fail: (error) => {
            return handleException(reject, error);
          }
        }

        //添加x-tif-validate-face-idcard
        const validateFaceTokens = StorageUtil.loadValidateFaceToken();
        if(typeof validateFaceTokens === 'object' && validateFaceTokens != null){
          Object.keys(validateFaceTokens).forEach(idcard=>{
            const token = validateFaceTokens[idcard];
            requestOptions.header['x-tif-validate-face-' + idcard] = token;
          })
        }
        

        //校验是否需要登录
        if(needLogin){
          //检查当前是否已登录
          let userInfo = StorageUtil.loadUserInfo();
          //如果没登录，则进行登录
          if (userInfo == null || userInfo.sessionid == null) {
            return login().then(res=>{
              userInfo = res;
              const sessionid = userInfo.sessionid;
              Object.assign(requestOptions.header, {
                'x-tif-sessionid': sessionid
              });
              wx.request(requestOptions);
            })
          }

          //填充sessionid
          const sessionid = userInfo.sessionid;
          Object.assign(requestOptions.header, {
            'x-tif-sessionid': sessionid
          })

        }
          

        wx.request(requestOptions);


        

      }
    });
  });
}

//默认的异常处理
function handleException(reject,e){
  console.error(e);
  wx.showToast({
    title: '服务器忙，请稍后再试',
    icon: 'none',
    duration: 2000
  })
  return reject(e);
}

function login(){
  return new Promise((resolve,reject)=>{
    wx.login({
      success: res => {
        const jsCode = res.code;
        customRequest({
          urlPath: '/api/frontend/user/login',
          data: {
            jsCode: jsCode
          },
          needLogin: false,
        }).then(userInfo => {
          StorageUtil.saveUserInfo(userInfo).then(()=>{
            return resolve(userInfo);
          })
          
        })
      }
    })
  })
  
}

function isLogin(){
  const userInfo = StorageUtil.loadUserInfo();
  if(userInfo && userInfo.sessionid){
    return true;
  }else{
    return false;
  }
}

function isBoundIdcard(){
  const userInfo = StorageUtil.loadUserInfo();
  if(userInfo && userInfo.isBoundIdcard){
    return true;
  }else{
    return false;
  }
}

module.exports = {
  request:customRequest,
  login: login,
  checkLogin: isLogin,
}