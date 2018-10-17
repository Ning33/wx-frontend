const { ServiceController } = require('../utils/ServiceController.js');
const { realNameFilter, personFilter, validateFaceFilter } = require('../utils/ServiceFilter.js');
const { Workflow } = require('../utils/Workflow.js');
const { grsfjyService } = require('../../../cgi/index.js');

class GrsfjyController extends ServiceController {

  constructor(props) {
    // 注册业务名称
    super('grsfjy');
    this.init();
  }

  init() {
    // 注册工作流
    this.registerWorkflows(new Workflow('sbxx'),new Workflow('jyxxqr'));
    // 注册过滤器
    this.registerFilters(realNameFilter, personFilter, validateFaceFilter);
  }

  // 实现提交方法
  submit(data) {
    grsfjyService.submit(this.serviceData.personId, this.serviceData.attachFile).then(() => {
      wx.navigateTo({
        url: '/pages/demo/result-success',
      })
    }).catch(err => {
      wx.navigateTo({
        url: '/pages/demo/result-fail',
      })
    })
  }
}

module.exports = GrsfjyController;