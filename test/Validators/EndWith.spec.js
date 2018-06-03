const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const path = require('path');
const CWD = process.cwd();
const MODULES_PATH = './modules/';

const EndWith = require(path.join(CWD, MODULES_PATH, 'Validators/EndWith'));

describe('EndWith', () => {
    it('End with random string', () => {
        for (let i = 0; i < 100; i++) {
            const start = randomString(~~(10 * Math.random()));
            const end = randomString(~~(10 * Math.random()) + 1);
            const str = start + end;
            const end_with_random_check = new EndWith(end);
            assert(end_with_random_check.check(str), `${str} end with ${end}`);
        }
        for (let i = 0; i < 100; i++) {
            const start = randomString(~~(10 * Math.random()));
            const end = randomString(~~(10 * Math.random() + 1)).replace(/A/g, 'B');
            const wrong_end = end + 'A';
            const str = start + wrong_end;
            const end_with_random_check = new EndWith(end);
            assert(!end_with_random_check.check(str), `${str} do not end with ${end}`);
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