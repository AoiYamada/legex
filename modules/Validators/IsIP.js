const Validator = require('./Validator');

module.exports = class IsIP extends Validator {
    constructor() {
        super();
    }
    check(x) {
    	// https://stackoverflow.com/questions/4460586/javascript-regular-expression-to-check-for-ip-addresses
        return Validator.test(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/, x);
    }
}