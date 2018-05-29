const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const path = require('path');
const CWD = process.cwd();
const MODULES_PATH = './modules/';

const StartWith = require(path.join(CWD, MODULES_PATH, 'Validators/StartWith'));

describe('StartWith', () => {
    it('Start with random string', () => {
        for (let i = 0; i < 100; i++) {
            const start = randomString(~~(10 * Math.random() + 1));
            const end = randomString(~~(10 * Math.random()));
            const str = start + end;
            const StartWithRandom = new StartWith(start);
            assert(StartWithRandom.check(str), `${str} start with ${start}`);
        }
        for (let i = 0; i < 100; i++) {
            const start = randomString(~~(10 * Math.random() + 1)).replace(/A/g, 'B');
            const wrong_start = 'A' + start;
            const end = randomString(~~(10 * Math.random()));
            const str = wrong_start + end;
            const StartWithRandom = new StartWith(start);
            assert(!StartWithRandom.check(str), `${str} do not start with ${start}`);
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