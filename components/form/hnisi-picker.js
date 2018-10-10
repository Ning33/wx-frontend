const formValidateBehavior = require('./behaviors/form-validate.js');
const { DictUtil } = require('../../utils/index.js');
Component({

    /**
     * 组件选项
     */
    options: {
        addGlobalClass: true  //全局样式
    },

    /**
     * 统一行为
     */
    behavior: [formValidateBehavior],

    /**
     * 组件的属性列表
     */
    properties: {
        mode: {       //模式: 普通选择器(selector), 日期(time), 地区(region)
            type: String,
            value: 'selector'
        },
        range: {      //获取数组
            type: Array,
            value: ''
        },
        rangeKey: {    //当 range 是一个 二维Object Array 时，通过 range - key 来指定 Object 中 key 的值作为选择器显示内容
            type: String,
            value:''
        },
        value: {       //外界传入值
            type: String,
            value: ''
        },
        index: {       //下标值
            type: Number,
            value: 0
        },  
        label: String,  //标签
        start: String,  //为时间选择器时-开始时间
        end: String,    //为时间选择器时-结束时间
        customItem: {   //为地区选择器时,可为每一列的顶部添加一个自定义的项
          type: String,
          value: ""
        },  
    },
    /**
     * 组件生命周期
     */
    lifetimes:{
      ready: function(){
      }
    },

    /**
     * 组件的初始数据
     */
    data: {
        range: {},  //数组
        value: '0', //外界传入值
        index: 0,   //下标值
        label: "",  //标签
        rangeKey: "", //Object数组时 显示值
    },

    /**
     * 组件的方法列表
     */
    methods: {

        handleChange(event) {    //value(数组下标值) 改变时触发 change 事件
          //获取选择器模式
          const _mode = this.data.mode;

          switch (_mode){
            case "selector":{ //单项普通选择器
              //实例化字典数组
              let arr = this._init();
              //获取字典数值
              let dictValue;
              //判断用户是否选择
              if (event.detail.value == 0) {
                console.log("用户未选择");
                dictValue = "0";
              } else {
                //获取字典数值
                dictValue = Object.keys(arr[event.detail.value - 1])[0];

              }
              //赋值,输出
              event.detail.dictValue = dictValue;
              this.triggerEvent('change', event.detail);
              break;
            }
            case "multiSelector":{ //多列选择器
              //获取数组
              let arr = this.data.range;
              //定义返回value
              let dictValue = [];
                for(let i=0; i<arr.length; i++){
                    //获取 字典值的 key
                    let dictKey =  Object.keys(arr[i][event.detail.value[i]])[0];
                    //获取字典值
                    dictValue[i] = arr[i][event.detail.value[i]][dictKey];
                }
              event.detail.dictValue = dictValue;
              this.triggerEvent('change', event.detail);
            }
          }
          
        },
        /**
         * 取消选择或点遮罩层收起 picker 时触发
         */
        handleTouchCancel(event) {    
          this.triggerEvent('cancel' , event.detail);
        },
        /**
         * 某一列的值改变时触发 columnchange 事件
         */
        handleColumnChange(event) {    
          this.triggerEvent('columnchange', event.detail);
        },
      /**
        * 初始化普通选择器 -- 字典数组
        */
        _init: function () {
          let that = this;
          //根据字段获取字典数组
          let label = that.data.label;
          let arr = DictUtil.getItems(label);
          return arr;
        }
    }
})
