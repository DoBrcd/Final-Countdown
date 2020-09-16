const config = require('./config.json');
const Discord = require('discord.js');

const bot = new Discord.Client({ disableEveryone: true});

bot.on('ready', async () => {
    console.log(`${bot.user.username} est en ligne !`);
    bot.user.setActivity('fait ses comptes');
})

bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return;

    let prefix = config.prefix;
    let msgArray = message.content.split(" ");
    let cmd = msgArray[0];
    let args = msgArray.slice(1);

    if(args[0] === "start"){
        console.log("start");
        return message.channel.send("Démarrage")
    }

})


bot.login(config.token);

module.exports = bot;