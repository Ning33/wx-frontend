const {RouterUtil} = require('../../../utils/router.js');

class ServiceController{
  
  // 服务名称
  serviceName;
  // 流程
  workflows = [
    
  ];

  // 业务办理须知页面地址
  tips;
  // 服务目录绝对路径
  contextPath = '/pages/service';

  // 业务准入过滤器，阅读业务办理须知后触发
  serviceFilters = [
    
  ];

  // 业务数据
  serviceData = {};

  constructor(props){
    // 获取serviceName，目前直接传入单个字符串即可，object参数类型为多入参预留
    let serviceName;
    if(typeof props === 'string'){
      serviceName = props;
    }else{
      serviceName = props.serviceName;
    }

    // 根据serviceName生成contextPath
    this.serviceName = serviceName;
    const contextPath = `${this.contextPath}/${serviceName}`;
    this.contextPath = contextPath;

    // 生成业务办理须知路径
    this.tips = `${contextPath}/${serviceName}-tips`;
  }

  getCurrentPage(){
    const pages = getCurrentPages();
      return pages[pages.length - 1];
  }

  /**
   * 获取当前流程
   * 通过页面路径
   */
  getCurrentWorkflow(){
    const page = this.getCurrentPage();
    const route = page.route;
    const workflowName = route.substr(route.lastIndexOf('-')+1);
    for(let i=0;i<this.workflows.length;i++){
      const workflow = this.workflows[i];
      if (workflow.name === workflowName) {
        return workflow;
      }
    }
  }
  
  // 开始业务流程，跳转至业务办理须知
  start(){
    // 清空业务数据
    this.serviceData = {};
    wx.navigateTo({
      url: this.tips
    })
  }

  // 流转至下一流程
  next(){
    // 查找workflows，进入下一流程
    const currentWorkflow = this.getCurrentWorkflow();
    if (currentWorkflow){
      const index = this.workflows.indexOf(currentWorkflow);
      
      if(index < this.workflows.length-1){
        // 如果不是最后一个流程，则触发下一流程
        const nextWorkflow = this.workflows[index + 1];
        return this.goToWorkflow(nextWorkflow);
      }else{
        // 如果是最后一个流程，则调用submit
        return this.submit();
      }
    }else{
      // 当前流程为空，则进行过滤器校验，校验通过后，初始化第一个流程为下一流程
      this.handleFilters(this.serviceData).then(res=>{
        if(res.result){
          const nextWorkflow = this.workflows[0];
          // 流转至下一流程
          this.goToWorkflow(nextWorkflow);
        }
      });

      // 注册回调处理
      this.getCurrentPage().onNavigateBack = (res)=>{
          const {type,data} = res;
          switch(type){
              case RouterUtil.navigateBackType.validateFace:{
                  break;
              }
              // 参保人列表选择
              case RouterUtil.navigateBackType.personSelect:{
                  const {personid,idcard,name} = data;
                  this.serviceData.personid = personid;
                  this.serviceData.idcard = idcard;
                  this.serviceData.name = name;
                  break;
              }
          }
          this.next();
      };
    }
  }

  goToWorkflow(workflow){
      let targetUrl = `${this.contextPath}/${this.serviceName}-${workflow.name}`;

      wx.navigateTo({
          url: targetUrl
      })
  }

  // 提交，子类需覆盖
  submit(){
    throw new Error('子类未实现此方法');
  }

  // 注册工作流
  registerWorkflows(...workflows){
    this.workflows.push(...workflows);
  }

  // 注册过滤器
  registerFilters(...serviceFilters){
    this.serviceFilters.push(...serviceFilters);
  }

  // 执行过滤器
  handleFilters(serviceData){
    const filters = [...this.serviceFilters];

      /**
       * 内部递归函数
       * @param {boolean} res.result 过滤器结果
       * @param {object} res.data 过滤器传递参数
       * @returns {Promise<res>}
       */
    const func = (res)=>{
      const filter = filters.shift();
      return filter.doFilter(res.serviceData).then(res => {
          // 过滤器未通过或者所有过滤器执行完毕，返回过滤结果，后续过滤器不再继续执行
        if (res.result === false || filters.length === 0){
            return res;
          }

          // 过滤器通过，继续执行下一个
          return func(res);
      })
    };
    
    return func({
      result:true,
      serviceData: serviceData
    });
  }

}





module.exports = {
  ServiceController:ServiceController,
}