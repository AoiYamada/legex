const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const path = require('path');
const CWD = process.cwd();
const MODULES_PATH = './modules/';

const IsInt = require(path.join(CWD, MODULES_PATH, 'Validators/IsInt'));

describe('IsInt', () => {
    const int_check = new IsInt();
    it('Valid Ints', () => {
        for (let i = 0; i < 100; i++) {
            const int = ~~(1000 * Math.random());
            assert(int_check.check(int), `${int} is Int`);
        }
    });
    it('Invalid Ints', () => {
        for (let i = 0; i < 100; i++) {
            const string = randomString(~~(100 * Math.random() + 1)) + 'a';
            assert(!int_check.check(string), `${string} is string`);
        }
    });
});

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function randomString(n) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=\\|][{}';:\"";

    for (var i = 0; i < n; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}