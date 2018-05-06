const Validator = require('./Validator');

module.exports = class IsWord extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^[\w]+$/, x);
    }
}