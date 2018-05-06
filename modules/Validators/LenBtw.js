const Validator = require('./Validator');

module.exports = class LenBtw extends Validator {
    constructor(m, n) {
        super();
        this.m = m;
        this.n = n;
    }
    check(x) {
        return x.length >= this.m && x.length <= this.n;
    }
}