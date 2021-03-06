require('dotenv').config()
const Discord = require('discord.js');
const Gif = require('./Models/gif.js');
const TimeManager = require('./Models/timeGestion.js');
const fs = require('fs');

const http = require("http");
const host = 'localhost';
const port = process.env.WEBSITES_PORT || 8080;

const gifJson = fs.readFileSync('./Data/gif_content.json', function (err) {
    if (err) {
        console.log(err);
    }
});
const timeJson = fs.readFileSync('./Data/channelTiming.json', function (err) {
    if (err) {
        console.log(err);
    }
});
const gif = new Gif(JSON.parse(gifJson));
const timeManager = new TimeManager(JSON.parse(timeJson));

const bot = new Discord.Client({ disableEveryone: true });
const dateFinale = new Date();
let count = [bot.setTimeout(() => { }, 1)];

let tempsRestant;
let tempsRestantSec;
let tempsRestantMin;
let tempsRestantHours;

bot.on('ready', async () => {
    console.log(`${bot.user.username} est en ligne !`);
    bot.user.setActivity("ses comptes", { type: "WATCHING" })
})


let timeToWait = [60000 * 5]; //toutes les 5 mins

function progress(message, isNewMsg) {
    tempsRestant = timeManager.getTime(message) - Date.now();
    tempsRestantSec = Math.floor(tempsRestant / 1000) % 60;
    tempsRestantMin = Math.floor(tempsRestant / 60000) % 60;
    tempsRestantHours = Math.floor(tempsRestant / 3600000);
    let txt = `Il reste ${tempsRestantHours} heures, ${tempsRestantMin} minutes et ${tempsRestantSec} secondes`;
    if (tempsRestant <= 0) {
        message.channel.send(gif.alea());
        timeToWait[message.channel.id] = 60000 * 5;
    } else {
        let msg = message;
        if ((tempsRestant / 1000) < 10) {//inf à 10sec
            timeToWait[message.channel.id] = 1000;
            isNewMsg = true;
        } else if ((tempsRestant / 1000) < 60) {//inf à 1min
            timeToWait[message.channel.id] = 1000 * 5;
        } else if ((tempsRestant / 1000) < 1200) {//inf à 20min
            timeToWait[message.channel.id] = 60000 * 1;
        } else if ((tempsRestant / 1000) < 3600) {//inf à 1h
            timeToWait[message.channel.id] = 60000 * 5;
        }
        if(isNewMsg == true) {
            message.channel.send(txt).then(message => {
                msg = message;
            }).catch(console.error);
        } else {
            msg.edit(txt);
        }

        count[message.channel.id] = bot.setTimeout(() => {
            progress(msg, false);
        }, timeToWait[message.channel.id]);
    }
}

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;

    let prefix = process.env.PREFIX;
    let msgArray = message.content.split(" ");
    let cmd = msgArray[0];
    let args = msgArray.slice(1);

    if (cmd != prefix) return
    if (args[0] === "start") {
        console.log("start");
        timeManager.createTimer(message, args[1]);
        //dateFinale.setHours(args[1].split(':')[0], args[1].split(':')[1]);
        timeToWait[message.channel.id] = timeToWait[0];
        count[message.channel.id] = bot.setTimeout(() => {
            progress(message, true);
        }, 100);
        return message.channel.send("Démarrage");
    } else if (args[0] == "addGif") {
        gif.content.push(args[1]);
        gif.save();
        return message.channel.send(`Ce gif vient d'être ajouter à l'ensemble de mes gifs : ${gif.lastAdd()}`)
    } else if (args[0] == "state") {
        clearTimeout(count);
        count[message.channel.id] = bot.setTimeout(() => {
            progress(message, true);
        }, 100);
    } else if (args[0] == "listGif") {
        message.channel.send("Tous mes gifs : \n");
        return gif.all(message);
    }

})

bot.login(process.env.TOKEN);

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(`<html><body><h1>This is HTML</h1></body></html>`);
};

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is running on http://:${port}`);
});

module.exports = bot;