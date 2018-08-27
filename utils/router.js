class RouterUtil{

  static navigateBackType = {
    validateFace: 'validateFace',
    personSelect: 'personSelect',
  };
  /**
   * 跳回上一页面并传递参数
   * @param res.type
   * @param res.data
   */
  static navigateBack(res){
    const {type,data} = res;
    // 获取目标页面
    const pages = getCurrentPages();
    const size = pages.length;

    const targetPage = pages[size - 2];
    wx.navigateBack({
      success: function(){
        if (typeof targetPage.onNavigateBack === 'function') {
          targetPage.onNavigateBack({
            type: type,
            data: data,
          })
        }
      }
    });
  }
}

module.exports = {
  RouterUtil: RouterUtil
}