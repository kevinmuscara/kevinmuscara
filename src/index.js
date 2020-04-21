const express = require('express');
const morgan  = require('morgan');
const path    = require('path');

const Logger = require('./log/logger');
const logger = new Logger();

express()
 .use(morgan('tiny'))
 .use(express.json())
 .use(express.urlencoded({extended:true}))
 .use(express.static(__dirname + '/public'))
 .use('/', require('./routes/router'))
 .use('/', express.static(path.join(__dirname, './views')))
 .set('views', path.join(__dirname, 'views'))
 .set('view engine', 'ejs')
 .listen(80, '0.0.0.0', () => logger.pass('App is now online'));

require('./discord');
