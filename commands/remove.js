const Discord = require('discord.js');
const axios = require('axios');
const fs = require('fs');
module.exports = {
    name: 'remove',
    description: 'remove printer to the database',
    async execute (config, client, message, args){
        console.log('User ' + message.member.user.tag + ' Executed remove command!')
        if (args.length < 1 | args.length > 1) {
            message.channel.send({ embeds: [
                new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Octoprint Notifier")
                .addFields(
                    { name: 'Usage', value: `${config.prefix} remove [printer name]`, inline: false },
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
                    myObject1.splice(index, 1);

                    var newData2 = JSON.stringify(myObject1);

                    try {
                        fs.writeFileSync("./database/printers.json", newData2);
                    } catch (error) {
                        console.log(`ERROR: ${error}`)
                        message.channel.send("there was an error while writting config file, see logs for more information ", error)
                        return;
                    }

                    message.channel.send({ embeds: [
                        new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Octoprint Notifier")
                        .addFields(
                            { name: 'SUCCESS', value: `printer ${args[0]} is removed the database`, inline: false },
                        )
                        .setTimestamp()
                        .setFooter('Octoprint Notifier')
                    ]})
                    console.log("printer ", args[0] , " is removed from the database");
                }
            } catch (error) {
                console.log(`ERROR: ${error}`)
                message.channel.send("there was an error while trying to read the json file, see logs for more information ", error)
            }
        }
    }
};