const {request,login} = require('./request.js');
const {StorageUtil} = require('./storage.js');
const {RouterUtil} = require('./router.js');
const { FileUtil} = require('./fileutil.js');
const { DictUtil } = require('./dictutil.js');
const p_utils = require('./p_utils.js');

module.exports = {
  request: request,
  StorageUtil: StorageUtil,
  RouterUtil: RouterUtil,
  FileUtil: FileUtil,
  DictUtil: DictUtil,
  p_utils: new p_utils(),
}