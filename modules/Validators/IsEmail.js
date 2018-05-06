const Validator = require('./Validator');

module.exports = class IsEmail extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, x);
    }
}