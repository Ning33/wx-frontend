const {StorageUtil} = require('../../../utils/storage.js');
const {login} = require('../../../utils/request.js');
const {personService} = require('../../../cgi/index.js');

/**
 * 业务准入过滤器
 */
class ServiceFilter {

  doFilter(serviceData) {
    return this.wrapResult(true, serviceData);
  }

  wrapResult(result, serviceData) {
    return new Promise((resolve, reject) => {
      resolve({
        result: result,
        serviceData: serviceData
      })
    })
  }
}

/**
 * 人脸识别过滤器
 */
class ValidateFaceFilter extends ServiceFilter {
  doFilter(serviceData){
    //判断业务中选择的人员是否存在有效的人脸识别
    const {personId,idcard,name} = serviceData;
    const token = StorageUtil.loadValidateFaceToken(idcard);
    if(typeof token === 'string' && token){
      return this.wrapResult(true, serviceData);
    }

    //人脸token无效，跳转至人脸识别处理
    wx.navigateTo({
      url: `/pages/validate-face/validate-face?name=${name}&idcard=${idcard}`,
    });

    return this.wrapResult(false, serviceData);
    
  }
}

/**
 * 实名绑定过滤器
 */
class RealNameFilter extends ServiceFilter {
  doFilter(serviceData) {
    let result = true;
    // 获取用户信息
    const user = StorageUtil.loadUserInfo();
    if(user == null){
      //如果未获取到用户信息，则登录
      return login().then(()=>{
        return this.doFilter(serviceData);
      });
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

    return this.wrapResult(result, serviceData);
  }
}

/**
 * 参保人选择过滤器
 */
class PersonFilter extends ServiceFilter{
  doFilter(serviceData){
    // 判断参保人是否已选中
    const personId = serviceData.personId;
    if(personId){
      return this.wrapResult(true, serviceData);
    }
    
    // 查询参保人列表，选择参保人
    return personService.queryList().then(personList=>{
      if(personList.length > 1){
        // 如果有多个参保人，则跳转至参保人列表选择页面
        wx.navigateTo({
          url: '/pages/user-center/person-list',
        });
        return this.wrapResult(false, serviceData); 
      }

      if(personList.length === 1){
        serviceData.personId = personList[0].personId;
        serviceData.idcard = personList[0].idcard;
        serviceData.name = personList[0].name;
        return this.wrapResult(true, serviceData);
      }

      return this.wrapResult(false, serviceData);
    });
    

    
  }
}

module.exports = {
  ServiceFilter: ServiceFilter,
  validateFaceFilter: new ValidateFaceFilter(),
  realNameFilter: new RealNameFilter(),
  personFilter: new PersonFilter(),
}