class Module {
    constructor(app) {
       this.app = app;
    }
   init() {
    const usersController = require('./users/users.controller');
    const authController = require('./auth/auth.controller');
    new usersController(this.app);
    new authController(this.app);
   }
}
module.exports = Module;