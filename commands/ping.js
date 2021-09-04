const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    description: 'check websocket ping',
    async execute (config, client, message, args){
        message.channel.send({ embeds: [
            new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Octoprint Notifier")
            .addFields(
                { name: '🏓 Ping', value: `${client.ws.ping}ms`, inline: false },
            )
            .setTimestamp()
            .setFooter('Octoprint Notifier')
        ]})
    }
};