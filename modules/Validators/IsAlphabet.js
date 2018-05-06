const Validator = require('./Validator');

module.exports = class IsAlphabet extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^[a-zA-Z]+$/, x);
    }
}