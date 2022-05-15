const authService = require('./auth.service');
const express = require('express');
const router = express.Router();

class usersController {
    constructor(app) {
      router.post('/login', authService.login);
      router.get('/getToken', authService.getToken);
      router.get('/getUser', authService.getUser);
      app.use('/api/v1/auth/', router);
    }
 }
module.exports = usersController;