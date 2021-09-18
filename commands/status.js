const Discord = require('discord.js');
const axios = require('axios');
const fs = require('fs');
module.exports = {
    name: 'status',
    description: 'get printer status',
    async execute (config, client, message, args){
        console.log('User ' + message.member.user.tag + ' Executed status command!')
        const data = fs.readFileSync('./database/printers.json', 'utf8')
        const parsed = JSON.parse(data)
        var data2  = parsed.map((entry) => { 
            //return { name: entry.name, value: `IP: ${entry.IP} \n Type: ${entry.type} \n Version: ${entry.version}`, inline: false }
            return { label: entry.name, value: entry.name}
        })
        message.channel.send({ content: "Select printer that you want to get the status from!", components: [
            new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId('status')
					.setPlaceholder('Nothing selected')
					.addOptions(data2)
			)
        ]})
    }
};
