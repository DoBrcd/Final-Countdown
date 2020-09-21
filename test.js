const Gif = require('./Models/gif.js');
const assert = require('assert').strict;

describe("test gif aleatoire", function() {
    it("should be able to generate random gif", function(){
        let gif = new Gif();
        let oldGif = gif.alea();
        let test = false;
        for (let index = 0; index < 15; index++) {
            let newGif = gif.alea();
            test |= (oldGif !== newGif);
            oldGif = newGif;
        }

        assert.strictEqual(test, 1);
    })
})