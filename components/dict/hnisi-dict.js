const {DictUtil} = require('../../utils/index.js');


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      value: '',
      observer: function(value){
        this.setData({
          display: DictUtil.getDisplay(this.properties.name,value)
        })
      }
    },
    name: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    display: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
