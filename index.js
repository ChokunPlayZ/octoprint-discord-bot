const {Client, Intents, Collection} = require('discord.js');
const Discord = require('discord.js');
const axios = require('axios')
const fs = require('fs');
const colour = require('colour');

const myIntents = new Intents();
myIntents.add();

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
    "Octoprint notifier" + nl +
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

client.login(config.token);


