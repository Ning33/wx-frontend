const {request,login} = require('./request.js');
const {StorageUtil} = require('./storage.js');
const {RouterUtil} = require('./router.js');
const { FileUtil} = require('./fileutil.js')
const p_utils = require('./p_utils.js');

module.exports = {
  request: request,
  StorageUtil: StorageUtil,
  RouterUtil: RouterUtil,
  FileUtil: FileUtil,
  p_utils: new p_utils(),
}