const chai = require('chai');
const assert = chai.assert;
const path = require('path');
const CWD = process.cwd();
const MODULES_PATH = './modules/';

const StartWith = require(path.join(CWD, MODULES_PATH, 'Validators/StartWith'));

describe('StartWith', () => {
    it('AbC', () => {
    	const StartWith_AbC = new StartWith('AbC');
        assert(StartWith_AbC.check('AbC') === true, 'AbC should be true');
        assert(StartWith_AbC.check('AbC123') === true, 'AbC123 should be true');
        assert(StartWith_AbC.check('AbC asdas') === true, 'AbC asdas should be true');
        assert(StartWith_AbC.check('Ab_C') === false, 'Ab_C should be false');
    });
});