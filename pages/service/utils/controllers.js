const YldyhdController = require('../yldyhd/YldyhdController.js');
const GrsfjyController = require('../grsfjy/GrsfjyController.js');

const controllers = {
  yldyhdController: new YldyhdController(),
  grsfjyController: new GrsfjyController()
}

function getController(serviceName){
  return controllers[serviceName+'Controller'];
}

module.exports = {
  ...controllers,
  getController: getController
}