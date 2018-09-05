// components/form/hnisi-form.js
const {Validator,ValidateType,ValidateStatus} = require('./Validator.js');
const formValidateBehavior = require('./behaviors/form-validate.js');

Component({
  relations:{
    'hnisi-form-field':{
      type: 'descendant',
      target: formValidateBehavior
    }
  },
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 需校验的数据
    model: {
      type: Object,
      value: {}
    },
    /**
     * 校验规则
     * {
     *  field1: [{validateType: func||regexp||string,tips: string},{validateType:'required',tips:'输入不能为空'}],
     *  field2: [{}]
     * }
     */
    rules: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowTips: false,
    tips: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 表单提交
     */
    handleSubmit(event){
      // 开始校验
      const model = this.properties.model;
      const rules = this.properties.rules;
      const validateResult = Validator.validate(model,rules);

      //开始格式化校验校验结果
      const formNodes = this.getRelationNodes('hnisi-form-field');
      let formTips = '';
      //推送校验结果至各组件内部处理
      formNodes.forEach(formNode=>{
        const field = formNode.id;
        const result = validateResult.detail[field];
        formNode.resetStatus();
        if(result != null){
          formNode.noticeStatus(result);

          //提取第一个tips
          if (!formTips) {
            if (result.validateStatus === ValidateStatus.ERROR) {
              formTips = result.tips;
            }
          }
        }

        
      })

      this.resetStatus();

      if(validateResult.validateStatus === ValidateStatus.ERROR){
        this.setData({
          isShowTips: true,
          tips: formTips,
        })
      }

      this.triggerEvent('submit',{
        ...validateResult
      })
    },
    resetStatus() {
      this.setData({
        isShowTips: false,
        tips: ''
      })
    }
  }

})
