class Workflow {
  // 流程ID
  id;
  // 流程名称
  name;
  // 流程显示名称
  title;
  // 流程顺序
  order;

  constructor(name){
    this.name = name;
  }

  // 进入流程之后先调用此方法
  onStart() {

  }
  // 退出此流程之前调用此方法
  onNext() {

  }

}

module.exports = {
  Workflow: Workflow,
}