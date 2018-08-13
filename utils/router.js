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
    wx.navigateBack({
      success: function(){
        // 跳转完成后，当前页面即是目标页面
        const pages = getCurrentPages();
        const size = pages.length;
   
        const currentPage = pages[size - 1];
        if (typeof currentPage.onNavigateBack === 'function') {
          currentPage.onNavigateBack({
            type: type,
            data: data,
          })
        }
      }
    })
  }
}

module.exports = {
  RouterUtil: RouterUtil
}