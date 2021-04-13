const userRoutes = require("./user/user.routes");
const userModel = require("./user/user.model");
const userService = require("./user/user.service");

const componentModule = {
  userModule: {
    routes: userRoutes,
    model: userModel,
    service: userService,
  },
};

module.exports = componentModule;
