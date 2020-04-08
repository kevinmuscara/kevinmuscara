const fs = require('fs');
const chalk = require('chalk');

class Logger {
    constructor(file) {
        this.file = file || null;

        if(this.file) {
            var header = [ ` Started on ${new Date()}` ];
            fs.writeFile(this.file, header.join('\n'), function(error) {
                if(error)
                    throw error;
            });
        }
    }

    chat(message, h = 'DM') {
        console.log(`${getTime()} ${chalk.bgGreen.black(` ${h} `)} ${message}`);
        if(this.file) {
            fs.appendFile(this.file, '\n' + `${getTime()} ${h} ${message}`, function(error) {
                if(error)
                    throw error;
            });
        }
    }
    
    pass(message, h = 'PASS') {
        console.log(`${getTime()} ${chalk.bgGreen.black(` ${h} `)} ${message}`);
        if(this.file) {
            fs.appendFile(this.file, '\n' + `${getTime()} ${h} ${message}`, function(error) {
                if(error)
                    throw error;
            });
        }
    }

    error(message, h = 'ERROR') {
        console.log(`${getTime()} ${chalk.bgRed.white(` ${h} `)} ${message}`);
        if(this.file) {
            fs.appendFile(this.file, '\n' + `${getTime()} ${h} ${message}`, function(error) {
                if(error)
                    throw error;
            });
        }
    }

    warn(message, h= 'WARN') {
        console.log(`${getTime()} ${chalk.bgYellow.black(` ${h} `)} ${message}`);
        if(this.file) {
            fs.appendFile(this.file, '\n' + `${getTime()} ${h} ${message}`, function(error) {
                if(error)
                    throw error;
            });
        }
    }
}

function getTime() {
    var date = new Date();
    var h = date.getHours().toString().padStart(2, '0');
    var m = date.getMinutes().toString().padStart(2, '0');
    var s = date.getSeconds().toString().padStart(2, '0');
    return `[${h}:${m}:${s}]`;
}

module.exports = Logger;