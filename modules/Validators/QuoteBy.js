const Validator = require('./Validator');

module.exports = class QuoteBy extends Validator {
    constructor(patternA, patternB, validator) {
        super();
        this.patternA = patternA;
        this.patternB = patternB;
        this.escape_patternA = Validator.escapeSymbols(patternA);
        this.escape_patternB = Validator.escapeSymbols(patternB);
        this.regex = new RegExp(`${this.escape_patternA}(.*?)${this.escape_patternB}`, "g");
        this.validator = validator;
    }
    check(x) {
        const match_array = x.match(this.regex);
        if (match_array) {
            for (const match_element of match_array) {
                const match = match_element.slice(this.patternA.length, -this.patternB.length);
                if (!this.validator.check(match)) {
                    return false;
                }
            };
            return true;
        } else {
            return false;
        }
    }
}