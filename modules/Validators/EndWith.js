const Validator = require('./Validator');

module.exports = class EndWith extends Validator {
    constructor(pattern) {
        super();
        const escape_pattern = Validator.escapeSymbols(pattern);
        this.regex = new RegExp(`${escape_pattern}$`);
    }
    check(x) {
        return Validator.test(this.regex, x);
    }
}