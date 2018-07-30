// pages/validate-face/validate-face-input.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    idcard: '',
  },

  handleInput: function(event){
    const input = event.detail.value;
    const field = event.target.dataset.field;
    this.setData({
      [field]: input
    });
  }
})