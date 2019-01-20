'use strict';

require('dotenv').config(); // this loads the defined variables from .env

var config = {
    secret: process.env.SECRET,
    port: process.env.PORT,
    database: process.env.DATABASE
};

module.exports = config;