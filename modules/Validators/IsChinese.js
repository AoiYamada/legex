const Validator = require('./Validator');

module.exports = class IsChinese extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^[\u4e00-\u9fbb\u3400-\u4DBF]$/, x);
    }
}