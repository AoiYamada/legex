const Validator = require('./Validator');

module.exports = class IsEmail extends Validator {
    constructor() {
        super();
    }
    check(x) {
    	// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    	// this regex does not cover all email cases but it checks common formats.
        return Validator.test(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, x);
    }
}