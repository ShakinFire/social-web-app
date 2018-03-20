const express = require('express');
const app = express();
const data = require('./data/data');

require('./config/express').init(app);
require('./routes').init(app, data);

app.listen(3001);
