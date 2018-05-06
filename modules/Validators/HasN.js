const Validator = require('./Validator');

module.exports = class HasN extends Validator {
    constructor(n, pattern) {
        super();
        const escape_pattern = Validator.escapeSymbols(pattern);
        this.regex = new RegExp(escape_pattern, 'g');
        this.n = n;
    }
    check(x) {
        return x.match(this.regex).length === this.n;
    }
}