const Validator = require('./Validator');

module.exports = class FirstN extends Validator {
    constructor(n, validator) {
        super();
        this.regex = new RegExp(`.{${n}}$`);
        this.validator = validator;
    }
    check(x) {
        return Validator.checkMatch(x, this.regex, this.validator, 0);
    }
}