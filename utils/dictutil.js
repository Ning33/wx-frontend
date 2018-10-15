const { StorageUtil } = require('./storage.js');
const { dictService } = require('../cgi/index.js');

/**
 * 字典工具类
 */
class DictUtil {
  /**
   * 更新字典
   */
  static update(){
    return new Promise((resolve , rejected) => {
      //获取字典配置
      let dict = StorageUtil.load("dict");

      if (dict === "" || dict === null){
        dict = {};
        dict._version = '0';
        StorageUtil.save("dict",dict);
      }
      if(dict._version === undefined){
        dict._version = '0';
      }

      DictUtil._update(dict._version);
      return resolve();
    })
  }

  /**
   * 获取字典显示值
   * 其中field,dictValue 需要使用双引号的字符串
   */
  static getDisplay(field , dictValue){
    //获取字典
    let dict = StorageUtil.load("dict");
    return dict[field][dictValue];
  }

  /**
   * .获取字典选项
   */
  static getItems(field){
    //获取字典
    let dict = StorageUtil.load("dict");
    //获取字段对应的字典项
    const fields = dict[field];
    return Object.keys(fields).filter((dictValue)=>{
      return dictValue !== '_version'
    }).map((dictValue)=>{
      return {
        dictValue: dictValue,
        dictDisplay: fields[dictValue],
      }
    });
  }
  /**
   * 更新字典配置操作
   */
  static _update(version){
    
    return new Promise((resolve, rejected) =>{
      dictService.updateDict(version).then((res) => {
        const data = res.data;
        if (res.needUpdate) { //需要更新
          //获取旧字典
          let dict = StorageUtil.load("dict");
          dict._version = data[0].version;
          //循环字典每一项
          for (let item of data) {
            let field = item.field;
            var dictValue = item.dictValue;
            //如果字典没有field属性 那么添加属性
            if (dict[field] === undefined || dict[field] === null) {
              dict[field] = { _version: item.version }
              dict[field][dictValue] = item.dictDisplay;
            } else {//如果字典有field属性 那么直接在属性里面在添加属性
              dict[field][dictValue] = item.dictDisplay;
            }
          }
          console.log(dict);
          //保存字典到global 和 storage
          StorageUtil.save("dict", dict);
          return resolve();

        } else {  //不需要更新
          console.log(res.data);
          return resolve();
        }
      });
    });
  }

}

module.exports = {
  DictUtil: DictUtil
}