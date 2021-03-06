let fs = require('fs');

class Gif {
    constructor(db) {
        this.content = db.content;
    }

    save(){
        const jsonData = JSON.stringify(this);
        fs.writeFile("./Data/gif_content.json", jsonData, function(err) {
            if(err) {
                console.log(err);
            }
        });
    }

    all(message) {
        let txt = "";
        let compteur = 0;
        for (let i = 0; i < this.content.length; i++) {
            compteur++;
            const gif = this.content[i];
            txt += gif;
            txt += "\n";
            if(compteur % 5 == 0) {
                message.channel.send(txt);
                txt = "";
            }
        }

        return message.channel.send(txt);
    }

    alea() {
        const index = Math.floor(Math.random() * this.content.length);
        return this.content[index];
    }

    lastAdd() {
        return this.content[this.content.length - 1];
    }
}

module.exports = Gif;