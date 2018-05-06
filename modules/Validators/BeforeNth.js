const Validator = require('./Validator');

module.exports = class BeforeNth extends Validator {
    constructor(n, pattern, validator) {
        super();
        const escape_pattern = Validator.escapeSymbols(pattern);
        this.escape_pattern = escape_pattern;
        this.regex = new RegExp(`^([^${escape_pattern}]*${escape_pattern}){${n}}`);
        this.validator = validator;
    }
    check(x) {
        const match_array = x.match(this.regex);
        if (match_array) {
            const beforeNth = match_array[0].slice(0, -this.escape_pattern.length);
            return this.validator.check(beforeNth);
        } else {
            return false;
        }
    }
}