const express = require('express');
const app = express();

const data = require('./data');

require('./config/express').init(app);
require('./config/passport').init(app, data);
require('./config/multer').init(app);

require('./routes').init(app, data);

app.listen(3001);
