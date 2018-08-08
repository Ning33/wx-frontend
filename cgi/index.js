const ValidateFaceService = require('./ValidateFaceService.js');
const UserService = require('./UserService.js');
const PersonService = require('./PersonService.js');


module.exports = {
  validateFaceService: new ValidateFaceService(),
  personService: new PersonService(),
  userService: new UserService(),
}