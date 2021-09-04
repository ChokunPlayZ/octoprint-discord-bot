module.exports = {
    name: 'settings',
    description: 'print settings',
    async execute (Discord, config, client, message, args){
        message.channel.send("This Command has been disabled!");
        return;
        if (message.member.user.id === config.ownerid) {
                message.channel.send('Command Allowed');
        } else {
            message.channel.send('Permission Required!');
        }
        return;
    }
};