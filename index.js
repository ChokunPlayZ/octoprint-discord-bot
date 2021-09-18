const {Client, Intents, Collection} = require('discord.js');
const Discord = require('discord.js');
const axios = require('axios')
const fs = require('fs');
const colour = require('colour');

const myIntents = new Intents();
myIntents.add();

const wait = require('util').promisify(setTimeout);

const client = new Client({
     intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS],
     presence: {
		status: 'online',
		activity: {
			name: 'printers',
			type: 'WATCHING'
		}
	}
});
const config = require('./config.json');

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


const nl = "\n"



console.log(
    "Chokun's Octoprint notifier V.0.1" + nl +
    "Starting ." + nl + " "
)
client.once('ready' , () => {
    console.log(nl + "Octoprint Notifier is online!" + nl)
    client.user.setActivity('printers', { type: 'WATCHING' });
})

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`Loaded ${file}`);
}

client.on('messageCreate', async (message) => {

    //console.log("I got some messages");

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    message.delete()

    if (config.restricttoowner == true) {
        if (!message.member.id == config.ownerid) {
            message.channel.send({ embeds: [
                new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Octoprint Notifier")
                .addFields(
                    { name: 'Permission ERROR', value: `You're NOT Allowed to use this bot \n if you host this bot and think this is a mistake \n check config.json file`, inline: false },
                )
                .setTimestamp()
                .setFooter('Octoprint Notifier')
            ]})
            return;
        }
    }

    if (!client.commands.has(command)) return;
    try{
        client.commands.get(command).execute(config ,client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error Please contact the Devs')
    }
})

// ===============================================================================================================
// ===============================================================================================================
// ===============================================================================================================
// ===============================================================================================================
// ===============================================================================================================
// ===============================================================================================================
// ===============================================================================================================
// ===============================================================================================================

client.on('interactionCreate', async (interaction) => {
	//if (!interaction.isButton()) return;
	console.log(interaction.customId);
    if (interaction.customId === "status") {
        var data1 = fs.readFileSync('./database/printers.json');
        var myObject1 = JSON.parse(data1);

        const index = myObject1.indexOf(myObject1.find(x => x.name === interaction.values[0]));
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
                    interaction.update({ content: [], embeds: [
                        new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Octoprint Notifier")
                        .addFields(
                            { name: 'Octorpint error', value: `Printer ${dtaf.name} is offline`, inline: false },
                        )
                        .setTimestamp()
                        .setFooter('Octoprint Notifier')
                    ], components: []})
                    return;
                } else {
                    interaction.update({ content: [], embeds: [
                        new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Octoprint Notifier")
                        .addFields(
                            { name: `ERROR`, value: `HTTP ${error.response.status}` , inline: false },
                        )
                        .setTimestamp()
                        .setFooter('Octoprint Notifier')
                    ], components: []})
                    return;
                }
            });
            const getjob = await axios({
                method: 'get',
                url: `http://${dtaf.IP}/api/job`,
                headers: {
                     'X-Api-Key': `${dtaf.apikey}`
                   }
            }).catch(function (error) {
                if (error.response) {
                    console.log(`Printer ${dtaf.name} is offline`)
                    interaction.update({ content: [], embeds: [
                        new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Octoprint Notifier")
                        .addFields(
                            { name: 'Octorpint error', value: `Printer ${dtaf.name} is offline`, inline: false },
                        )
                        .setTimestamp()
                        .setFooter('Octoprint Notifier')
                    ], components: []})
                    return;
                } else {
                    interaction.update({ content: [], embeds: [
                        new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle("Octoprint Notifier")
                        .addFields(
                            { name: `ERROR`, value: `HTTP ${error.response.status}` , inline: false },
                        )
                        .setTimestamp()
                        .setFooter('Octoprint Notifier')
                    ], components: []})
                    return;
                }
            });
            const printerstat = getservedta.data
            const jobstat = getjob.data
            if (printerstat.sd.ready = "false") {
                sdstat = "isn't ready / disabled"
            } else {
                sdstat = "is ready"
            }
            interaction.update({ content: null, embeds: [
                new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Octoprint Notifier")
                .addFields(
                    { name: `${dtaf.name} Status`, value: `Status: ${printerstat.state.text} \n SD Status: ${sdstat}`, inline: false },
                    { name: `Temp`, value: `Tool Head: ${printerstat.temperature.tool0.actual}/${printerstat.temperature.tool0.target} \n Bed: ${printerstat.temperature.bed.actual}/${printerstat.temperature.bed.target}`, inline: false },
                    { name: `File Info`, value: `Filename: ${jobstat.job.file.display} \n File Size: ${jobstat.job.file.size / 1000000}MB`, inline: false },
                    { name: `Progress`, value: `Print Time Left: ${jobstat.progress.printTimeLeft}s \n Print Time: ${jobstat.progress.printTime}s`, inline: false }
                )
                .setTimestamp()
                .setFooter('Octoprint Notifier')
            ], components: []})
        } catch (error) {
            interaction.update({ content: [], embeds: [
                new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Octoprint Notifier")
                .addFields(
                    { name: 'ERROR', value: `Error connecting to Octoprint: \n ${error}`, inline: false },
                )
                .setTimestamp()
                .setFooter('Octoprint Notifier')
            ], components: []})
            console.log(error);
        }
        //await interaction.update({ content: 'something happens', embeds: [], components: [] });
    }

    if (interaction.customId === "getcam") {
        try {
            var data1 = fs.readFileSync('./database/printers.json');
            var myObject1 = JSON.parse(data1);

            const index = myObject1.indexOf(myObject1.find(x => x.name === interaction.values[0]));
            const data2 = myObject1.splice(index, 1);
            const dtaf = data2[0]

            const getservedta = await axios({
                method: 'get',
                url: `http://${dtaf.IP}/webcam/?action=snapshot`,
                responseType: 'stream',
            }); //end connection capture
            //console.log(getservedta.data)
            if (!getservedta.data) {
                interaction.deferReply({ content: 'Connection Error Please Check your webcam', components: []})
            }
            let currentDate = new Date();
            const filename = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getYear()}-${currentDate.getHours()}-${currentDate.getMinutes()}-${currentDate.getSeconds()}`;
            const w = getservedta.data.pipe(fs.createWriteStream(`./temp/${filename}.jpg`));
            w.on('finish', () => {
                interaction.update({ content: 'here is the webcam still image', files: [`./temp/${filename}.jpg`], components: []})
                });
        } catch (error) {
            console.log(error);
        }
    }
    
});

client.login(config.token);
