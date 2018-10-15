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
    //input类型，text,number,idcard,digit,password
    type: {
      type: String,
      value: 'text',
      observer: function (newVal) {
        if(newVal === 'password'){
          this.setData({
            _type: 'text',
            password: true
          })
        }else{
          this.setData({
            _type: newVal,
            password: false
          })
        }
      }
    },
    label: String,
    value: null,
    placeholder:{
      type: String,
      value: ''
    },
    disabled:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
     * 组件生命周期
     */
  lifetimes: {
    ready: function () {
      
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInput(event){
      this.triggerEvent('input',event.detail);
    },
    handleFocus(event){
      this.resetStatus();
      this.noticeForm('hideTips',this);
    }
  }
})
