const express = require('express');
const app = express();

require('./config/express').init(app);
require('./routes').init(app);

app.listen(3001);
