module.exports = class Validator {
    // Override check
    check(x) {
        return true;
    }
    get isValidator() {
        return true;
    }
    static test(regex, x) {
        return regex.test(x);
    }
    static escapeSymbols(pattern) {
        var subRegex = /[^a-zA-Z0-9]/g;
        var sub = '\\\$&';

        return pattern.replace(subRegex, sub);
    }
    static checkMatch(x, regex, validator, group_idx) {
        const match_array = regex.exec(x);

        if (match_array) {
            const element = match_array[group_idx];
            return validator.check(element);
        } else {
            return false;
        }
    }
}