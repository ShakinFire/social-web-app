/* globals __dirname */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const init = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../../public')));
    app.use(logger('combined'));

    // view engine setup decorator
    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'pug');
};

module.exports = {
    init,
};
