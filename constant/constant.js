module.exports = {
  // 安全级别
  SecurityLevel: {
    ALL: '0',
    LOGIN: '1',
    REAL_NAME: '2',
    VALIDATE_FACE: '3',
  },
  // request请求返回码
  ResponseStatus: {
    OK: '0',
    JS_CODE_INVALID: '1001',
    SESSION_WX_EXPIRED: '1002',
    SESSION_GATEWAY_EXPIRED: '1003',
    VALIDATE_FACE_EXPIRED: '1004',
    UNBOUND_USER: '1005',
    DATA_VALIDATE_EXCEPTION: '2001',
    UNKNOWN_ERROR: '9999',
  }
}