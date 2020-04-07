const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');

const Logger = require('./log/logger');
const logger = new Logger('./log/logs.txt');
const router = require('./routes/routes');

const app  = express();
const port = 8080;

app
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended : true }))
.use('/', express.static(path.join(__dirname, './views')))
.use('/', router);

const server = app.listen(port, '0.0.0.0', () => {
    logger.pass(`online`);
});