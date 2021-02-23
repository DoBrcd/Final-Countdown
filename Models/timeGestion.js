let fs = require('fs');

class TimeManager {
    constructor(db) {
        this.content = db.content;
    }

    save(){
        const jsonData = JSON.stringify(this);
        fs.writeFile("./Data/channelTiming.json", jsonData, function(err) {
            if(err) {
                console.log(err);
            }
        });
    }

    createTimer(message, time) {
        const timeParam = time.split(':')
        let timeTemp = new Date();
        timeTemp.setHours(timeParam[0], timeParam[1]);
        this.content[this.channel(message)] = timeTemp;
        this.save();
    }

    channel(message) {
        return message.channel.id;
    }

    getTime(message) {
        return new Date(this.content[this.channel(message)]);
    }

    setTime(message, time) {
        this.createTimer(message, time);
    }
}

module.exports = TimeManager;