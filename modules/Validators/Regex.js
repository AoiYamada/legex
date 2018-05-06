const Validator = require('./Validator');

module.exports = class Regex extends Validator {
    constructor(regex) {
        super();
        this.regex = regex;
    }
    check(x) {
        return Validator.test(this.regex, x);
    }
}