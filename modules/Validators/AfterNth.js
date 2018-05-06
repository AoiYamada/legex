const Validator = require('./Validator');

module.exports = class AfterNth extends Validator {
    constructor(n, pattern, validator) {
        super();
        const escape_pattern = Validator.escapeSymbols(pattern);
        this.regex = new RegExp(`(?:[^${escape_pattern}]*${escape_pattern}){${n}}(.+$)`);
        this.validator = validator;
    }
    check(x) {
        return Validator.checkMatch(x, this.regex, this.validator, 1);
    }
}