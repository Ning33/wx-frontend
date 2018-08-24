const {ServiceController} = require('../utils/ServiceController.js');
const {realNameFilter,personFilter,validateFaceFilter} = require('../utils/ServiceFilter.js');
const {Workflow} = require('../utils/Workflow.js');
const {yldyhdService} = require('../../../cgi/index.js');

class YldyhdController extends ServiceController{

  constructor(props){
    // 注册业务名称
    super('yldyhd');
    this.init();
  }

  init(){
    // 注册工作流
    this.registerWorkflows(new Workflow('sbxx'),new Workflow('cbqkqr'),new Workflow('ffzhqr'));
    // 注册过滤器
    this.registerFilters(realNameFilter,personFilter,validateFaceFilter);
  }

  // 实现提交方法
  submit(data){
    yldyhdService.submit(this.serviceData.personid,this.serviceData.sbxx).then(()=>{
      wx.navigateTo({
        url: '/pages/demo/result-success',
      })
    }).catch(err=>{
      wx.navigateTo({
        url: '/pages/demo/result-fail',
      })
    })
  }

}

module.exports = YldyhdController;