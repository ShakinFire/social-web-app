const express = require('express');
const app = express();

const data = require('./data/data');
const exampleData = require('./data/example-data');
const controllers = require('./controllers')(exampleData);

require('./config/express').init(app);
require('./config/passport').init(app, exampleData);
require('./routes').init(app, controllers);

app.listen(3001);
