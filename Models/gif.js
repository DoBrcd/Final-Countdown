class Gif {
    constructor() {
        this.content = [
            "https://tenor.com/view/queen-elizabeth-wave-royalty-bye-hi-gif-8402952",
            "https://tenor.com/view/queen-freddie-mercury-hair-flip-ive-got-to-break-free-drag-gif-5096231",
            "https://tenor.com/view/forest-gump-tom-hanks-running-sprinting-leaving-gif-5212535",
            "https://tenor.com/view/pongo-yay-101dalmatians-clock-countdown-gif-11676332",
            "https://tenor.com/view/kitten-cuckoo-clock-birds-gif-10414681",
            "https://tenor.com/view/countdown-gif-11215002"
        ];
    }

    alea() {
        const index = Math.floor(Math.random() * this.content.length);
        console.log(index);
        return this.content[index];
    }
}

module.exports = Gif;