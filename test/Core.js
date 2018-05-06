const chai = require('chai');
const assert = chai.assert;
const path = require('path');
const CWD = process.cwd();
const MODULES_PATH = './modules/';

const Core = require(path.join(CWD, MODULES_PATH, 'Core'));
const Validator = require(path.join(CWD, MODULES_PATH, 'Validators/Validator'));

class TrueValidator extends Validator {
    check(x) {
        return true;
    }
}

class FalseValidator extends Validator {
    check(x) {
        return false;
    }
}

const trueValidator = new TrueValidator();
const falseValidator = new FalseValidator();

describe('Core', () => {
    it('And', () => {
        assert(Core.And(trueValidator, trueValidator)('test') === true, 'T && T === T');
        assert(Core.And(trueValidator, falseValidator)('test') === false, 'T && F === F');
        assert(Core.And(falseValidator, trueValidator)('test') === false, 'F && T === F');
        assert(Core.And(falseValidator, falseValidator)('test') === false, 'F && F === F');
    });
    it('Or', () => {
        assert(Core.Or(trueValidator, trueValidator)('test') === true, 'T && T === T');
        assert(Core.Or(trueValidator, falseValidator)('test') === true, 'T && F === T');
        assert(Core.Or(falseValidator, trueValidator)('test') === true, 'F && T === T');
        assert(Core.Or(falseValidator, falseValidator)('test') === false, 'F && F === F');
    });
    it('Xor', () => {
        assert(Core.Xor(trueValidator, trueValidator)('test') === false, 'T && T === F');
        assert(Core.Xor(trueValidator, falseValidator)('test') === true, 'T && F === T');
        assert(Core.Xor(falseValidator, trueValidator)('test') === true, 'F && T === T');
        assert(Core.Xor(falseValidator, falseValidator)('test') === false, 'F && F === F');
    });
    it('Advanced use', () => {
        const trueCore = Core.And(trueValidator, trueValidator);
        const falseCore = Core.Or(falseValidator, falseValidator);

        assert(Core.And(trueCore, trueCore)('test') === true, 'T && T === T');
        assert(Core.And(trueCore, falseCore)('test') === false, 'T && F === F');
        assert(Core.And(falseCore, trueCore)('test') === false, 'F && T === F');
        assert(Core.And(falseCore, falseCore)('test') === false, 'F && F === F');
    });
});