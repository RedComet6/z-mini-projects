const Letter = require("./Letter");

class Word {
    constructor(word) {
        this.letters = word.split("").map((char) => new Letter(char));
    }

    guessLetter(char) {
        let found = false;

        this.letters.forEach((letter) => {
            if (letter.guess(char)) {
                found = true;
            }
        });

        return found;
    }

    guessedCorrectly() {
        return this.letters.every((letter) => letter.visible);
    }

    toString() {
        return this.letters.join(" ");
    }

    getSolution() {
        return this.letters.map((letter) => letter.getSolution().join(""));
    }
}

module.exports = Word;
