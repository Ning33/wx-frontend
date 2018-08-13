//index.js
const {yldyhdController} = require('../service/utils/controllers.js');

Page({
  data: {
   
  },
  onLoad: function () {
    yldyhdController.start();
  }
})
