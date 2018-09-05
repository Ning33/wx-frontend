// components/form/hnisi-input.js
const formValidateBehavior = require('./behaviors/form-validate.js');

Component({
  options: {
    addGlobalClass: true
  },
  behaviors: [formValidateBehavior],
  relations: {
    './hnisi-form':{
      type: 'ancestor'
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    //input类型，text,number,idcard
    type: {
      type: String,
      value: 'text'
    },
    name: String,
    label: String,
    value: null,
    placeholder:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInput(event){
      this.triggerEvent('input',event.detail);
    }
  }
})
