const { DictUtil } = require('../../utils/index.js')

Page({
  data: {
   
  },
  onLoad: function () {
    //更新字典配置
    DictUtil.update();
  }
})
