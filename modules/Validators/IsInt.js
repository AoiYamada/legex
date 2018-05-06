const Validator = require('./Validator');

module.exports = class IsInt extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^\d+$/, x);
    }
}