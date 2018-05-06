const Validator = require('./Validator');

module.exports = class LenLt extends Validator {
    constructor(n) {
        super();
        this.n = n;
    }
    check(x) {
        return x.length < this.n;
    }
}