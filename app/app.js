const express = require('express');
const app = express();
const data = require('./data/data');
const exampleData = require('./data/example-data');

require('./config/express').init(app);
require('./config/passport').init(app, exampleData);
require('./routes').init(app, data);

app.listen(3001);
