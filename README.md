# octoprint-discord-bot
a Discord Bot that let you view your Octoprint Status remotely

this is everything you need to get the bot up and running
## Get the code.
```
git clone https://github.com/ChokunPlayZ/octoprint-discord-bot.git
```
## Prepareing the Enviorment
This bot requires on Discord JS v13 which provides better performance so these are the requirements

 - NodeJS v16 or later
 - Discord JS v13 or later
 - any OS will be fine you can also run it on your octopi just install node!
 
 These are the require packages
 - Axios  
 - fs  
 - colour  
 - discord.js

you can install it using only one command just run

`npm -i axios discord.js colour`

  this will take care of the packages
  

`* you cant use discord.js 12 because it changes how the API handles Embeds`

## Configure the bot
you can follow a great tutorial people at [discordjs.guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html) has made
## Set up the code
1. edit `config.json` with a text edit of your choice any texteditor will work
2. change the prefix if you like the default one is `-op`
3. copy your bot token then place it into the `"put your token here"` section
4. (optional) copy your discord user id for the step by step guide click [here](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)
5. paste your user id that you just copied into the `"ownerid"` section
6. if you didn't follow number 4 change "restrict to owner" to false (this will allow other to mess with your bot) set it to true if you don't want someone gaining access to your printer
7. save the file and exit
8. start the bot
9. if you get an error feel free to open an issue
9.1. if you get an `TOKEN_INVALID` error go back and check number 3
10. you have set up your code 
11. invite the bot to your server, follow this awsome guide from [discordjs.guide](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)
11.1. the bot require text permission  this is my [recomended permission value](https://discordapi.com/permissions.html#519232)
12. now you're set
## Add your printer(s)
This bot support multiple printers you can add them as much as you need!

in your server text channel that the bot have access to type this following command

`-op add <your printer name> <your printer IP Address> <and your API Key>`

to get octoprint API key head to your Octoprint Instence

 1. go to your octoprint settings page
 2. click on API under the feature section
 3. then copy the API key
 
 *for the IP you just need to enter the IP remove "http://" or it will break
 *the printer name cannot contain spaces or it will mess up the config file
 then send the message
 the bot will attempt to connect to your octoprint instence and get it's version and other data
 if the bot can't reach your octoprint instence it will trow an error
 
 ## Using the commands
 now not that many commands are implmented yet  I will add more soon!
 the default prefix is
    `-op`
so if you didn't change the prefix in `config.json` this is what it will be
 run`<prefix> help` to get all the command available at the time
 
 basic commands like status will add printer printing status in the future
I'm trying to get as much commands released as possible!

