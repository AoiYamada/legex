const Validator = require('./Validator');

module.exports = class Anything extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return true;
    }
}