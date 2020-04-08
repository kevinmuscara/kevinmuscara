const dotenv = require('dotenv');
const fs = require('fs');

if(fs.existsSync('.env')) {
    dotenv.config();
}

const defaults = {
    NODE_ENV: 'production',
    TIP_KARMA: 500,
    PRINT_REWARDS: true,
    HIDE_TIP_MESSAGES: true,
    HIDE_JOIN_MESSAGES: true,
};

Object.keys(defaults).forEach((key) => {
    process.env[key] = (key in process.env) ? process.env[key] : defaults[key];
});

module.exports = process.env;