class PingCommand {
    constructor() {
        this.name = 'ping',
        this.alias = [''],
        this.usage = ''
    }

    async run(client, message, args) {
        try {
            message.channel.send(`${client.ping}ms`);
        } catch(error) { throw error };
    }
};

module.exports = PingCommand;