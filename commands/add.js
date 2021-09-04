const Discord = require('discord.js');
const axios = require('axios');
const fs = require('fs');
module.exports = {
    name: 'add',
    description: 'add printer to the database',
    async execute (config, client, message, args){
        console.log('User ' + message.member.user.tag + ' Executed add command!')
        if (args.length < 3) {
            message.channel.send({ embeds: [
                new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Octoprint Notifier")
                .addFields(
                    { name: 'Usage', value: `${config.prefix} add [printer name] [octoprint ip] [api token]`, inline: false },
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
                if (lookupdata == true) {
                    message.channel.send({ embeds: [
                        new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Octoprint Notifier")
                        .addFields(
                            { name: 'ERROR', value: `printer already exist, run "${config.prefix} list" to list all printers`, inline: false },
                        )
                        .setTimestamp()
                        .setFooter('Octoprint Notifier')
                    ]})
                    return;
                } else {
                    try {
                        const getservedta = await axios({
                            method: 'get',
                            url: `http://${args[1]}/api/version`,
                            headers: {
                                'X-Api-Key': `${args[2]}`
                              }
                        });
                        const serverinfo = getservedta.data

                        var data1 = fs.readFileSync('./database/printers.json');
                        var myObject1 = JSON.parse(data1);

                        let newData = {
                            "id": data.length + 1,
                            "name": args[0],
                            "IP": args[1],
                            "type": serverinfo.text.split(/ +/)[0],
                            "version": serverinfo.server,
                            "apikey": args[2]
                        }  

                        myObject1.push(newData);

                        var newData2 = JSON.stringify(myObject1);
                        fs.writeFile("./database/printers.json", newData2, (err) => {
                        if (err) {
                            console.log(`ERROR: ${err}`)
                            message.channel.send("there was an error while writting config file, see logs for more information ", err)
                        }
                        message.channel.send({ embeds: [
                            new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle("Octoprint Notifier")
                            .addFields(
                                { name: 'SUCCESS', value: `printer ${args[0]} is now added to the database`, inline: false },
                            )
                            .setTimestamp()
                            .setFooter('Octoprint Notifier')
                        ]})
                        console.log("printer ", args[0] , " is now added to the database");
                        });
                    } catch (err) {
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
                        return;
                    }
                }
            } catch (error) {
                console.log(`ERROR: ${error}`)
                message.channel.send("there was an error while trying to read the json file, see logs for more information ", error)
            }
        }
    }
};