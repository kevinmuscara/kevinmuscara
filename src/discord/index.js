const Carlo  = require('discord.js-carlo');
const config = require('./config.json');
const Logger = require('../log/logger');

const carlo   = new Carlo({ token: config.token, prefix: '-@-@-@!!!', commands: __dirname + '/commands/'});
const client  = carlo._getClient();
const logger  = new Logger();

client.on('message', async message => {
    if(message.channel.type === 'dm') {
        if(message.attachments.first()) {
            logger.chat(`(${message.author.username}): ${message.attachments.first().url}`);
        } else {
            logger.chat(`(${message.author.username}): ${message.content}`);
        }
    } else if(message.channel.type === 'group') {
        if(message.attachments.first()) {
            logger.chat(`(${message.channel.name}) (${message.author.username}): ${message.attachments.first().url}`, `GROUP CHAT`);
        } else {
            logger.chat(`(${message.channel.name}) (${message.author.username}): ${message.content}`, `GROUP CHAT`);
        }
    } else {
        if(message.attachments.first()) {
            logger.chat(`(${message.guild.name}) (${message.channel.name}) (${message.author.username}): ${message.attachments.first().url}`, `SERVER`);
        } else {
            logger.chat(`(${message.guild.name}) (${message.channel.name}) (${message.author.username}): ${message.content}`, `SERVER`);
        }
    }
});