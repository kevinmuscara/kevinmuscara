const mongoose = require('mongoose');
const MONGOURI = `mongodb://userDatabase:e550pinxwt@ds257698.mlab.com:57698/node-auth`;

const Logger = require('../log/logger');
const logger = new Logger();

const initDB = async() => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true
        });
        logger.pass(`Connected to DB`);
    } catch(error) {
        logger.error(error);
    }
};

module.exports = initDB;