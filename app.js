const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());


// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));


async function init() {
  const approuting = require('./modules');
  const appmodules = new approuting(app);
  appmodules.init();
}
init();
module.exports = app;

// var  port = process.env.PORT || 4001;
// app.listen(port);
// console.log('Order API is runnning at ' + port);
