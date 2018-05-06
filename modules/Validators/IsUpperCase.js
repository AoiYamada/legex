const Validator = require('./Validator');

module.exports = class IsUpperCase extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^[A-Z]+$/, x);
    }
}