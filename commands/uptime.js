const Discord = require('discord.js');
module.exports = {
    name: 'uptime',
    description: 'view bot uptime',
    async execute (config, client, message, args){
        console.log('User ' + message.member.user.tag + ' Executed uptime command')

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        var uptime = (days + " Days/ " + hours + " Hours/ " + minutes + " Minutes/ " + seconds + " Seconds")
        message.channel.send({ embeds: [
            new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Chokun's Toolbox uptime")
            .setURL("https://www.chokunplayz.com/bots")
            .setAuthor('Up Time')
            .setDescription('บอทรันติดต่อกันมากี่วันแล้วนะ')
            .addFields(
                { name: 'Uptime', value: uptime, inline: false},
                //{ name: 'Online Since', value: "uptime", inline: false}
            )
            .setTimestamp()
            .setFooter('Octoprint Notifier')
        ]})
    }
};