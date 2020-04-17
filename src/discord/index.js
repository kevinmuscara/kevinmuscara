const Carlo  = require('discord.js-carlo');
const config = require('./config.json');

const carlo  = new Carlo({
    token: config.token,
    prefix: '-@-@-@!!!',
    commands: __dirname + '/commands/'
});