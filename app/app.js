const express = require('express');
const app = express();

const data = require('./data');
// const controllers = require('./controllers');

require('./config/express').init(app);
require('./config/passport').init(app, data);
require('./routes').init(app, data);

app.listen(3001);
