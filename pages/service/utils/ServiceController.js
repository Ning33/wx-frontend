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

  /**
   * 获取当前流程
   * 通过页面路径
   */
  getCurrentWorkflow(){
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
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
  next(data){
    // 查找workflows，进入下一流程
    const currentWorkflow = this.getCurrentWorkflow();
    let nextWorkflow;
    if (currentWorkflow){
      const index = this.workflows.indexOf(currentWorkflow);
      
      if(index < this.workflows.length-1){
        // 如果不是最后一个流程，则触发下一流程
        nextWorkflow = this.workflows[index + 1];
      }else{
        // 如果是最后一个流程，则调用submit
        return this.submit(data);
      }
    }else{
      // 当前流程为空，则初始化第一个流程为下一流程
      nextWorkflow = this.workflows[0];
    }
    
    // 流转至下一流程
    let targetUrl = `${this.contextPath}/${this.serviceName}-${nextWorkflow.name}`;
    // 如果有参数需要传递，则通过data传递
    if (data) {
      const jsonStr = JSON.stringify(data);
      targetUrl += `?data=${jsonStr}`;
    }

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
  handleFilters(page){
    const filters = [...this.serviceFilters];
    
    const func = (res)=>{
      const filter = filters.shift();
      return filter.doFilter(res.data).then(res => {
          // 过滤器未通过或者所有过滤器执行完毕，返回过滤结果，后续过滤器不再继续执行
        if (res.result === false || filters.length === 0){
            return res;
          }

          // 过滤器通过，继续执行下一个
          return func(res);
      })
    }
    
    return func({
      result:true,
      data:{
        page:page,
        controller: this,
      }
    });
  }

}





module.exports = {
  ServiceController:ServiceController,
}