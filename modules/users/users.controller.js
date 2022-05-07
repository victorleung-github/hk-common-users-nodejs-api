const usersService = require('./users.service');
const express = require('express');
const router = express.Router();

class usersController {
    constructor(app) {
      router.get('/', usersService.getUsers);
      router.post('/', usersService.addUsers);
      app.use('/api/v1/users', router);
    }
 }
module.exports = usersController;