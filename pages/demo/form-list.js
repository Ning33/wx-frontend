const {DictUtil} = require('../../utils/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectorPicker: {
      range: ['一','二','三'],
      value: '一'
    },
    selectorDict: {
      range: DictUtil.getItems('sex'),
      value: ''
    },
    multiSelectorPicker: {
      range: [['0','1','2'],['10','11','12']],
      value: ['1','10']
    },
    multiSelectorDict: {
      range: [DictUtil.getItems("region"),DictUtil.getItems("sex")],
      value: ['1','1']
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data);
  },

  handleSelectorPickerChange(event){
    this.setData({
      'selectorPicker.value': event.detail.value
    })
  },

  handleSelectorDictChange(event){
    this.setData({
      'selectorDict.value': event.detail.value
    })
  },

  handleMultiSelectorPickerChange(event){
    this.setData({
      'multiSelectorPicker.value': event.detail.value
    })
  },

  handleMultiSelectorPickerColumnchange(event){
    console.log(event.detail);
    const {column,value} = event.detail;
    if(column === 0){
      let childRange;
      switch(value){
        case '0':{
          childRange = ['00', '01', '02'];
          break;
        }
        case '1':{
          childRange = ['10', '11', '12'];
          break;
        }
        case '2':{
          childRange = ['20', '21', '22'];
          break;
        }
      }
      this.setData({
        'multiSelectorPicker.range[1]': childRange
      })
    }
  },

  handleMultiSelectorDictChange(event) {
    this.setData({
      'multiSelectorDict.value': event.detail.value
    })
  },

  handleMultiSelectorDictColumnchange(event){
    const { column, value } = event.detail;
    if (column === 0) {
      let childRange;
      switch (value) {
        case '1': {
          childRange = DictUtil.getItems('sex');
          break;
        }
        case '2': {
          childRange = DictUtil.getItems('sex').filter((dictItem)=>{
            return dictItem.dictDisplay === '女'
          });
          break;
        }
      }
      this.setData({
        'multiSelectorDict.range[1]': childRange
      })
    }
  }

})