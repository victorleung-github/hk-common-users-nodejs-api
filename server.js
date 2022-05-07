const app = require('./app');
const server = require('http').Server(app);
var  port = process.env.PORT || 4002;
server.listen(port,'localhost', ()=> {
    console.log('Server Started');
});