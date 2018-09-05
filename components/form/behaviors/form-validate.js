const { ValidateStatus } = require('../Validator.js');

module.exports = Behavior({
  data: {
    validateStatus: ValidateStatus.UNSET,
    ValidateStatus: ValidateStatus,
  },
  methods: {
    // 提供修改内部状态的方法
    noticeStatus({validateStatus,tips}) {
      this.setData({
        validateStatus: validateStatus,
        tips: tips || '数据有误'
      })
    },

    resetStatus() {
      this.setData({
        validateStatus: ValidateStatus.UNSET,
        tips: ''
      })
    }
  }
})
