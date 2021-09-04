const Discord = require('discord.js');
module.exports = {
    name: 'about',
    description: 'display about bot',
    async execute (config, client, message, args){
        console.log('User ' + message.member.user.tag + ' Executed About command!')
        message.channel.send({ embeds: [
            new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Chokun's Toolbox About")
            .setURL("https://www.chokunplayz.com/bots")
            .setAuthor('About')
            .setDescription('about this bot')
            .addField('Developer', '@ChokunPlayZ', false)
            .setTimestamp()
            .setFooter('Octoprint Notifier')
        ]})
        return;
    }
};