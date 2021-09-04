const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
    name: 'list',
    description: 'list printers in databases',
    async execute (config, client, message, args){
        console.log('User ' + message.member.user.tag + ' Executed list command!')
        try {
            const data = fs.readFileSync('./database/printers.json', 'utf8')
            const parsed = JSON.parse(data)
            var data2  = parsed.map((entry) => { 
                return { name: entry.name, value: `IP: ${entry.IP} \n Type: ${entry.type} \n Version: ${entry.version}`, inline: false }
            })
            message.channel.send({ embeds: [
                new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Printer List")
                .addFields(
                    data2
                )
                .setTimestamp()
                .setFooter('Octoprint Notifier')
            ]})
        } catch (error) {
            message.channel.send({ embeds: [
                new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Octoprint Notifier")
                .addFields(
                    { name: 'ERROR', value: `error`, inline: false },
                )
                .setTimestamp()
                .setFooter('Octoprint Notifier')
            ]})
            console.log(error)
            return;
        }
        
    }
};