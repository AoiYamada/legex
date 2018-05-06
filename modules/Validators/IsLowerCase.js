const Validator = require('./Validator');

module.exports = class IsLowerCase extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^[a-z]+$/, x);
    }
}