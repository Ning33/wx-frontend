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

}

module.exports = {
  Workflow: Workflow,
}