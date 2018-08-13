const YldyhdController = require('../yldyhd/YldyhdController.js');

const controllers = {
  yldyhdController: new YldyhdController()
}

function getController(serviceName){
  return controllers[serviceName+'Controller'];
}

module.exports = {
  ...controllers,
  getController: getController
}