const Validator = require('./Validator');

module.exports = class IsIP extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/, x);
    }
}