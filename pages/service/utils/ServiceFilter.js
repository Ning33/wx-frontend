const {StorageUtil} = require('../../../utils/storage.js');

/**
 * 业务准入过滤器
 */
class ServiceFilter {

  doFilter(data) {
    return this.wrapResult(true, data);
  }

  wrapResult(result, data) {
    return new Promise((resolve, reject) => {
      resolve({
        result: result,
        data: data
      })
    })
  }
}

/**
 * 人脸识别过滤器
 */
class ValidateFaceFilter extends ServiceFilter {
  doFilter(data){
    // TODO
    return this.wrapResult(true,data);
  }
}

/**
 * 实名绑定过滤器
 */
class RealNameFilter extends ServiceFilter {
  doFilter(data) {
    let result = true;
    // 获取用户信息
    const user = StorageUtil.loadUserInfo();
    if(user == null){
      result = false;
    }
    result = user.isBoundIdcard;

    if(result === false){
      //跳转至实名绑定
      wx.showModal({
        title: '温馨提示',
        content: '请先完成实名用户绑定',
        success: (res) => {
          const { confirm } = res;
          if (confirm) {
            wx.navigateTo({
              url: '/pages/user-center/user-binder',
            })
          }
        }
      });
    }

    return this.wrapResult(result,data);
  }
}

/**
 * 参保人选择过滤器
 */
class PersonFilter extends ServiceFilter{
  doFilter(data){
    // 判断参保人是否已选中
    const {controller} = data;
    const personid = controller.serviceData.personid;
    if(personid){
      return this.wrapResult(true,data);
    }
    
    // 查询参保人列表，选择参保人
    
    // 如果有多个参保人，则跳转至参保人列表选择页面
    wx.navigateTo({
      url: '/pages/user-center/person-list',
    })

    return this.wrapResult(false,data)
  }
}

module.exports = {
  ServiceFilter: ServiceFilter,
  validateFaceFilter: new ValidateFaceFilter(),
  realNameFilter: new RealNameFilter(),
  personFilter: new PersonFilter(),
}