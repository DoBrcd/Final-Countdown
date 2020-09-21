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

    alea() {
        const index = Math.floor(Math.random() * this.content.length);
        return this.content[index];
    }

    lastAdd() {
        return this.content[this.content.length - 1];
    }
}

module.exports = Gif;