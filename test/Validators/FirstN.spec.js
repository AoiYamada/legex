const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const path = require('path');
const CWD = process.cwd();
const MODULES_PATH = './modules/';

const FirstN = require(path.join(CWD, MODULES_PATH, 'Validators/FirstN'));
const IsInt = require(path.join(CWD, MODULES_PATH, 'Validators/IsInt'));

describe('FirstN', () => {
    const int_check = new IsInt();
    it('Valid Ints', () => {
        for (let i = 0; i < 100; i++) {
            // https://stackoverflow.com/questions/2175512/javascript-expression-to-generate-a-5-digit-number-in-every-case
            const random_digit = ~~(10 * Math.random()) + 1;
            const first_n_check = new FirstN(random_digit, int_check);
            const zeros_str = zeros(random_digit - 1);
            const random_digit_int = ~~(Math.random() * ~~(9 + zeros_str)) + ~~(1 + zeros_str);
            const end = randomString(~~(10 * Math.random()) + 1);
            const string_start_with_n_digit = random_digit_int + end;
            assert(first_n_check.check(string_start_with_n_digit), `${string_start_with_n_digit} first ${random_digit} letters are Integer`);
        }
    });
    it('Invalid Ints', () => {
        for (let i = 0; i < 100; i++) {
            const random_digit = ~~(10 * Math.random()) + 1;
            const first_n_check = new FirstN(random_digit, int_check);
            const string_not_start_with_n_digit = randomString(~~(10 * Math.random()) + 2 * random_digit).replace(/\d/g, 'a');
            assert(!first_n_check.check(string_not_start_with_n_digit), `${string_not_start_with_n_digit} first ${random_digit} letters are not Integer`);
        }
    });
    it('Shorter than n must false', () => {
        for (let i = 0; i < 100; i++) {
            const random_digit = ~~(10 * Math.random()) + 1;
            const first_n_check = new FirstN(random_digit, int_check);
            const string_not_start_with_n_digit = randomString(~~(random_digit * Math.random()));
            assert(!first_n_check.check(string_not_start_with_n_digit), `${string_not_start_with_n_digit} is shorter than ${random_digit}`);
        }
    });
});

function zeros(n) {
    var text = "";

    for (var i = 0; i < n; i++)
        text += '0';

    return text;
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function randomString(n) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=\\|][{}';:\"";

    for (var i = 0; i < n; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}