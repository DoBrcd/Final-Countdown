const config = require('./config.json');
const Discord = require('discord.js');
const Gif = require('./Models/gif.js');

const bot = new Discord.Client({ disableEveryone: true});
const dateFinale = new Date();

bot.on('ready', async () => {
    console.log(`${bot.user.username} est en ligne !`);
    bot.user.setActivity('fait ses comptes');
})

let tempsRestant;
let tempsRestantSec;
let tempsRestantMin;
let tempsRestantHours;

let timeToWait = 60000 * 5; //toutes les 5 mins

function progress(message){
    tempsRestant = dateFinale - Date.now();
    tempsRestantSec = Math.floor(tempsRestant/1000) % 60;
    tempsRestantMin = Math.floor(tempsRestant/60000);
    let txt = `Il reste ${tempsRestantMin} minutes et ${tempsRestantSec} secondes`;
    if(tempsRestant <= 0) {
        message.channel.send(Gif.alea());
        timeToWait = 60000 * 5;
    } else {
        message.channel.send(txt);
        if((tempsRestant / 1000) < 10) {//inf à 10sec
            timeToWait = 1000;
        } else if((tempsRestant / 1000) < 60) {//inf à 1min
            timeToWait = 1000 * 5;
        } else if((tempsRestant / 1000) < 1200) {//inf à 20min
            timeToWait = 60000 * 1;
        } else if((tempsRestant / 1000) < 3600) {//inf à 1h
            timeToWait = 60000 * 5;
        }

        setTimeout(()=> {
            progress(message);
        }, timeToWait);
    }
}

bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return;

    let prefix = config.prefix;
    let msgArray = message.content.split(" ");
    let cmd = msgArray[0];
    let args = msgArray.slice(1);

    if(cmd != prefix) return
    if(args[0] === "start"){
        console.log("start");
        dateFinale.setHours(args[1].split(':')[0], args[1].split(':')[1]);
        let count = setTimeout(()=> {
            progress(message);
        }, 100);
        return message.channel.send("Démarrage");
    }

})


bot.login(config.token);

module.exports = bot;