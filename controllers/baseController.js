// CONTAINER SERVICE
const container = require("../core/container");

class BaseController {
  constructor() {
    this.container = container;
  }
}

module.exports = BaseController;
