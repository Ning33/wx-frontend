const formValidateBehavior = require('./behaviors/form-validate.js');

Component({

  options: {
    addGlobalClass: true
  },
  behaviors: [formValidateBehavior],
  relations: {
    './hnisi-form': {
      type: 'ancestor'
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    mode: { //模式: 普通选择器(selector), 日期(time), 地区(region)
      type: String,
      value: 'selector'
    },
    range: { //获取数组
      type: Array,
      value: []
    },
    rangeKey: { //当 range 是一个 二维Object Array 时，通过 range - key 来指定 Object 中 key 的值作为选择器显示内容
      type: [String],
      value: 'dictDisplay'
    },
    rangeValue: {
      type: [String],
      value: 'dictValue'
    },
    dict: {
      type: Boolean,
      value: false
    },
    value: { //外界传入值
      type: [String, Array],
      value: '',
      observer: function(value) {
        const mode = this.properties.mode;
        switch (mode) {
          case 'selector':
            {
              // value有值
              if (typeof value === 'string' && value !== '') {
                // 查找value对应的index
                this.setData({
                  index: this.findIndex(value,this.properties.range,this.properties.rangeValue),
                  showPlaceholder: false
                });
              } else {
                // value无值，index设置为第一个
                this.setData({
                  index: 0,
                  showPlaceholder: true
                })
              }
              break;
            }
          case 'multiSelector':{
            if(value instanceof Array && value.length > 0){
              const valueArray = value;
              const indexArray = valueArray.map((item,index)=>{
                return this.findIndex(item,this.properties.range[index],this.properties.rangeValue);
              });
              this.setData({
                index: indexArray,
                showPlaceholder: false
              })
            }else{
              this.setData({
                index: [0,0],
                showPlaceholder: true
              })
            }
            break;
          }
        }
      }
    },
    label: String, //标签
    placeholder: {
      type: String,
      value: '请选择'
    },
    start: String, //为时间选择器时-开始时间
    end: String, //为时间选择器时-结束时间
    customItem: { //为地区选择器时,可为每一列的顶部添加一个自定义的项
      type: String,
      value: ""
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    index: 0,   //下标值
    showPlaceholder: true
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    created: function(){
    },
    ready: function() {
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

    handleChange(event) { //value(数组下标值) 改变时触发 change 事件
      //获取选择器模式
      const mode = this.properties.mode;

      switch (mode) {
        case "selector":
          { //单项选择器
            const index = event.detail.value;
            this.triggerEvent('change', {
              value: this.findValue(index,this.properties.range,this.properties.rangeValue)
            });
            break;
          }
        case "multiSelector":
          { //多列选择器
            const indexArray = event.detail.value;
            const valueArray = indexArray.map((index,i)=>{
              return this.findValue(index,this.properties.range[i],this.properties.rangeValue);
            });
            this.triggerEvent('change',{
              value: valueArray
            });
            break;
          }
      }

    },
    /**
     * 取消选择或点遮罩层收起 picker 时触发
     */
    handleCancel(event) {
      this.triggerEvent('cancel', event.detail);
    },
    /**
     * 某一列的值改变时触发 columnchange 事件
     */
    handleColumnChange(event) {
      const {column,value:index} = event.detail;
      this.triggerEvent('columnchange', {
        column: column,
        value: this.findValue(index, this.properties.range[column], this.properties.rangeValue)
      });
    },
    /**
     * 查找数组
     * 根据值找到对应的序列
     */
    findIndex(value,range,rangeValue){
      return range.findIndex((rangeItem) => {
        if (typeof rangeItem === 'string') {
          return rangeItem === value;
        } else if (typeof rangeItem === 'object') {
          return rangeItem[rangeValue] === value;
        } else {
          throw new Error('range传入格式有误');
        }
      });
    },
    /**
     * 
     */
    findValue(index,range,rangeValue){
      const targetRangeItem = range[index];
      if (typeof targetRangeItem === 'object' && targetRangeItem != null) {
        return targetRangeItem[rangeValue];
      } else if (typeof targetRangeItem === 'string') {
        return targetRangeItem;
      }
    }
  }
})