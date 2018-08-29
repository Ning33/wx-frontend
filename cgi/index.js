const ValidateFaceService = require('./ValidateFaceService.js');
const UserService = require('./UserService.js');
const PersonService = require('./PersonService.js');
const ServiceItems = require('./ServiceItems.js');
const YldyhdService = require('./YldyhdService.js');
const MyService = require("./MyService.js");
const DictService = require('./DictService.js');
const PersonDetail = require('./PersonDetail.js');


module.exports = {
  validateFaceService: new ValidateFaceService(),
  personService: new PersonService(),
  userService: new UserService(),
  serviceItems: new ServiceItems(),
  yldyhdService: new YldyhdService(),
  myService: new MyService(),
  dictService: new DictService(),
  personDetail: new PersonDetail()
}