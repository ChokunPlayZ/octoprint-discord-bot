const Discord = require('discord.js');
module.exports = {
    name: 'reload',
    description: 'reload command',
    async execute(config, client, message, args){
        message.channel.send("This Command has been disabled!");
        return;
        if (message.member.user.id === config.ownerid) {
            message.reply("Reloading...");
            setTimeout(function() {
                client.destroy();
                process.exit(0);
            }, 1000);
        } else {
            message.channel.send('มึงใช้ไม่ได้ I SUS');
        }
    }
};