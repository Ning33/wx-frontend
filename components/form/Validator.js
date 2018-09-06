
/**
   * 校验状态
   */
const ValidateStatus = {
  UNSET: '0',//未设置
  OK: '1',
  WARN: '2',//暂未实现，只提示，不强制要求修正
  ERROR: '3',
};

class Validator{

  /**
   * 表单验证
   * @param {Object} model 数据
   * @param {Object} rules 校验规则
   * @param {Array} rules[field] 单个字段的校验规则数组
   * @param {Function|RegExp} rules[field][].validateType 校验类型
   * @param {String} rules[field][].tips 提示信息
   * @return {ValidateResult}
   */
  static validate(model,rules){
    // TODO
    // 清洗规则字符串，转化为标准的规则定义
    
    //获取待校验字段,循环校验每个字段
    const detail = {};
    Object.keys(rules).forEach(field=>{
      const value = model[field];//待校验值
      const validateArray = rules[field];//校验规则数组
      let tips = '';

      //开始校验
      const isPass = validateArray.every(item=>{
        const {validateType} = item;
        let func;
        if(typeof validateType === 'function'){//函数处理
          func = validateType;
        }else if(validateType instanceof RegExp){//正则处理
          func = function(value){
            return validateType.test(value);
          }
        }else{
          throw new Error('校验规则配置错误');
        }

        const isPass = func(value, model);
        if(!isPass){
          tips = item.tips;
        }

        return isPass;
      });

      const validateStatus = isPass ? ValidateStatus.OK : ValidateStatus.ERROR;
      
      detail[field] = {
        validateStatus: validateStatus,
        tips: tips
      }

    });

    //生成最终的校验结果
    const isPass = Object.values(detail).every(item=>{
      if (item.validateStatus === ValidateStatus.ERROR){
        return false;
      }else{
        return true;
      }
    });

    const validateStatus = isPass?ValidateStatus.OK:ValidateStatus.ERROR;

    //生成校验不通过数组
    const errorArray = Object.keys(detail).map(field=>{
      const item = detail[field];
      return {
        field: field,
        ...item,
      }
    }).filter(item=>{
      return item.validateStatus !== ValidateStatus.OK;
    });

    return new ValidateResult({
      validateStatus,detail,errorArray
    })
  }
}



/**
 * 校验方式
 */
class ValidateType {
  static required(value, model) {
    let dataType = typeof value;
    if (value instanceof Array) {
      dataType = 'array';
    }
    switch (dataType) {
      case 'string': {
        return value.trim().length > 0
      }
      case 'array': {
        return value.length > 0
      }
      case 'object': {
        return value != null && Object.keys(value).length > 0
      }
    }
    return true;
  }
  static mobile(value){
    return /^1[3456789]\d{9}$/.test(value);
  }
  static num(value){
    return /^[1-9][0-9]*$/.test(value);
  }
  static money(value){
    return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value);
  }
  static idcard(value){
    return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
  }
};

/**
 * 校验结果
 */
class ValidateResult{
  /**
   * @property {ValidateStatus} validateStatus 校验状态
   */
  validateStatus;
  /**
   * @property {Object} detail
   * @property {ValidateStatus} detail[field].validateStatus 验证状态
   * @property {String} detail[field].tips  提示信息
   */
  detail;
  /**
   * 校验错误信息
   */
  errorArray;

  constructor(props){
    this.validateStatus = props.validateStatus;
    this.detail = props.detail;
    this.errorArray = props.errorArray;
  }
}

module.exports = {
  Validator: Validator,
  ValidateResult: ValidateResult,
  ValidateType: ValidateType,
  ValidateStatus: ValidateStatus,
}