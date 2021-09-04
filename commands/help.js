const Discord = require('discord.js');
module.exports = {
    name: 'help',
    description: 'Help Command',
    async execute (config, client, message, args){
        console.log('User ' + message.member.user.tag + ' Executed Help command!')
        message.channel.send({ embeds: [
            new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Chokun's Toolbox Help")
            .setAuthor('Help')
            .addFields(
                { name: 'Prefix', value: `${config.prefix} \n \u200B`, inline: false },
                { name: 'help', value: 'list commands', inline: false },
                { name: 'about', value: 'about this bot  \n \u200B', inline: false },
                { name: 'add', value: 'add printer', inline: false },
                { name: 'status', value: "see printer's status", inline: false },
                { name: 'remove', value: 'remove printer', inline: false },
                { name: 'getcam', value: 'get still shot of printer webcam', inline: false }
            )
            .setTimestamp()
            .setFooter('Octoprint Notifier')
        ]});
        return;
    }
};