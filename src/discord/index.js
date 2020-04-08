const { Client } = require('discord.js');
const client     = new Client({ autoReconnect : true });

const Config = require('./config.json');

const Logger = require('../log/logger');
const logger = new Logger('./log/logs.txt');

client.on('message', message => {
    if(message.channel.type === "dm") {
        if(message.attachments.first()) {
            const url = message.attachments.first().url;
            logger.chat(`(${message.author.username}): ${url}`);
        } else {
            logger.chat(`(${message.author.username}): ${message.content}`);
        }
    } else if(message.channel.type === "group") {
        if(message.attachments.first()) {
            const url = message.attachments.first().url;
            logger.chat(`(${message.channel.name}) (${message.author.username}): ${url}`, 'GROUP');
        } else {
            logger.chat(`(${message.channel.name}) (${message.author.username}): ${message.content}`, 'GROUP');
        }
    } else {
        if(message.attachments.first()) {
            const url = message.attachments.first().url;
            logger.chat(`(${message.guild.name}) (${message.channel.name}) (${message.author.username}): ${url}`, 'SERVER');
        } else {
            logger.chat(`(${message.guild.name}) (${message.channel.name}) (${message.author.username}): ${message.content}`, 'SERVER');
        }
    }
});

module.exports.getStatus = function() {
    return client.status;
}

module.exports.getPing = function() {
    return client.ping;
}

module.exports.getServers = function() {
    return client.servers;
}

client.login(Config.token);