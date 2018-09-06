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
     *  field1: [{validateType: func,tips: string},{validateType:ValidateType.required,tips:'输入不能为空'}],
     *  field2: [{}]
     * }
     */
    rules: {
      type: Object,
      value: {},
      observer: function(newVal,oldVal){
        if(this.isReady){
          const formatedRules = this.formatRules(newVal);
          this.setData({
            formatedRules: formatedRules
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowTips: false,
    tips: ''
  },

  lifetimes: {
    ready: function(){
      this.isReady = true;
      const formatedRules = this.formatRules(this.properties.rules);
      this.setData({
        formatedRules: formatedRules
      })
    }
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
      const rules = this.data.formatedRules;
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
    /**
     * 重置状态
     */
    resetStatus() {
      this.setData({
        isShowTips: false,
        tips: ''
      })
    },
    /**
     * 格式化rules
     */
    formatRules(rules){
      const targetRules = {};
      Object.keys(rules).forEach(field => {
        const ruleArray = rules[field];
        targetRules[field] = ruleArray.map(rule => {
          const targetRule = {};
          //如果传入为function，则修改为object
          if (typeof rule === 'function') {
            targetRule.validateType = rule;
          }else if(typeof rule === 'object'){
            Object.assign(targetRule, rule);
          }
          //如果未传入tips，则自动生成tips
          if (targetRule.tips == null) {
            targetRule.tips = '表单填写有误';//通用的默认错误
            if (targetRule.validateType === ValidateType.required) {
              //如果为必录项，则获取字段名称，提示请输入【字段名称】
              const targetNode = this.getRelationNodes('hnisi-form-field').find(node => {
                return node.id === field;
              });
              const label = targetNode.properties.label;
              targetRule.tips = '请输入' + label;
            }
          }
          return targetRule;
        });
      });

      return targetRules;
    }
  }

})
