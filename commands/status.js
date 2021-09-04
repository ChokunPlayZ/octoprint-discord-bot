const Discord = require('discord.js');
const axios = require('axios');
const fs = require('fs');
module.exports = {
    name: 'status',
    description: 'get printer status',
    async execute (config, client, message, args){
        console.log('User ' + message.member.user.tag + ' Executed status command!')
        if (args.length < 1 | args.length > 1) {
            message.channel.send({ embeds: [
                new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Octoprint Notifier")
                .addFields(
                    { name: 'Usage', value: `${config.prefix} status [printer name]`, inline: false },
                )
                .setTimestamp()
                .setFooter('Octoprint Notifier')
            ]})
            return;
        } else {
            try {
                const data = fs.readFileSync('./database/printers.json', 'utf8')
                const jsonData = JSON.parse(data)
                parsedJsonData = jsonData
                const lookupdata = !!jsonData.find(data => {  
                    return data.name == args[0]
                })
                if (!lookupdata == true) {
                    message.channel.send({ embeds: [
                        new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Octoprint Notifier")
                        .addFields(
                            { name: 'ERROR', value: `printer does not exist, run "${config.prefix} list" to list all printers`, inline: false },
                        )
                        .setTimestamp()
                        .setFooter('Octoprint Notifier')
                    ]})
                    return;
                } else {
                    var data1 = fs.readFileSync('./database/printers.json');
                    var myObject1 = JSON.parse(data1);

                    const index = myObject1.indexOf(myObject1.find(x => x.name === args[0]));
                    const data2 = myObject1.splice(index, 1);
                    const dtaf = data2[0]

                    try {
                        const getservedta = await axios({
                            method: 'get',
                            url: `http://${dtaf.IP}/api/printer`,
                            headers: {
                                'X-Api-Key': `${dtaf.apikey}`
                              }
                        }).catch(function (error) {
                            if (error.response) {
                                console.log(`Printer ${dtaf.name} is offline`)
                                message.channel.send({ embeds: [
                                    new Discord.MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle("Octoprint Notifier")
                                    .addFields(
                                        { name: 'Octorpint error', value: `Printer ${dtaf.name} is offline`, inline: false },
                                    )
                                    .setTimestamp()
                                    .setFooter('Octoprint Notifier')
                                ]})
                                return;
                            } else {
                                message.channel.send({ embeds: [
                                    new Discord.MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle("Octoprint Notifier")
                                    .addFields(
                                        { name: `ERROR`, value: `HTTP ${error.response.status}` , inline: false },
                                    )
                                    .setTimestamp()
                                    .setFooter('Octoprint Notifier')
                                ]})
                                return;
                            }
                        });
                        const printerstat = getservedta.data
                        if (printerstat.sd.ready = "false") {
                            sdstat = "isn't ready / disabled"
                        } else {
                            sdstat = "is ready"
                        }
                        message.channel.send({ embeds: [
                            new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle("Octoprint Notifier")
                            .addFields(
                                { name: `${dtaf.name} Status`, value: `Status: ${printerstat.state.text} \n SD Status: ${sdstat}`, inline: false },
                                { name: `Temp`, value: `Tool Head: ${printerstat.temperature.tool0.actual}/${printerstat.temperature.tool0.target} \n Bed: ${printerstat.temperature.bed.actual}/${printerstat.temperature.bed.target}`, inline: false }
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
                                { name: 'ERROR', value: `Error connecting to Octoprint: \n ${err}`, inline: false },
                            )
                            .setTimestamp()
                            .setFooter('Octoprint Notifier')
                        ]})
                        console.log(error);
                    }
                    
                    
                    return;
                }
            } catch (error) {
                
            }
            return;
        }
    }
};