class Letter {
    constructor(char) {
        this.visible = !/[a-z0-9]/i.test(char);
        this.char = char;
    }

    guess(letter) {
        if (this.char === letter) {
            this.visible = true;
            return true;
        }
        return false;
    }

    toString() {
        if (this.visible === true) {
            return this.char;
        }
        return "_";
    }

    getSolution() {
        return this.char;
    }
}

module.exports = Letter;
