class Module {
    constructor(app) {
       this.app = app;
    }
   init() {
    const usersController = require('./users/users.controller');
    new usersController(this.app);
   }
}
module.exports = Module;