const Gif = require('./Models/gif.js');
const assert = require('assert').strict;

describe("test gif aleatoire", function() {
    it("should be able to generate random gif", function(){
        const truc = {
            "content" : [
                "https://tenor.com/view/queen-elizabeth-wave-royalty-bye-hi-gif-8402952",
                "https://tenor.com/view/queen-freddie-mercury-hair-flip-ive-got-to-break-free-drag-gif-5096231",
                "https://tenor.com/view/forest-gump-tom-hanks-running-sprinting-leaving-gif-5212535",
                "https://tenor.com/view/pongo-yay-101dalmatians-clock-countdown-gif-11676332",
                "https://tenor.com/view/kitten-cuckoo-clock-birds-gif-10414681",
                "https://tenor.com/view/countdown-gif-11215002",
                "https://tenor.com/Jc4z.gif",
                "https://media.discordapp.net/attachments/646528313220661268/719513944750030868/EZPZ.gif",
                "https://tenor.com/view/christmas-eve-happy-oui-minions-gif-13130311"
            ]
        }
        let gif = new Gif(truc);
        let oldGif = gif.alea();
        let test = false;
        for (let index = 0; index < 15; index++) {
            let newGif = gif.alea();
            console.log(newGif);
            if(oldGif != newGif){
                test = true;
            }
            oldGif = newGif;
        }

        assert.strictEqual(test, true);
    })
})