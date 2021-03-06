const Validator = require('./Validator');

module.exports = class LenGeq extends Validator {
    constructor(n) {
        super();
        this.n = n;
    }
    check(x) {
        return x.length >= this.n;
    }
}