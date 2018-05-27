(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.legex = {
    C: require('./modules/Core'),
    V: require('./modules/Validators')
}
},{"./modules/Core":2,"./modules/Validators":32}],2:[function(require,module,exports){
module.exports = class Core {
    static And(...args) {
        return combinator(and)(...args);
    }
    static Or(...args) {
        return combinator(or)(...args);
    }
    static Xor(...args) {
        return combinator(xor)(...args);
    }
}

// helpers
function combinator(fn, memory = [], ...args) {
    const local = memory;
    let x;
    for (const arg of args) {
        if (arg.isValidator || arg.name === 'bound combinator')
            local.push(arg);
        else {
            x = arg;
            break;
        }
    }
    if(x)
        return fn(local, x);
    else {
        const c = combinator.bind(null, fn, local)
        c.check = x => {
            return c(x);
        }
        return c;
    }
}

function and(validatorsArray, x) {
    for (const validator of validatorsArray) {
        if (!validator.check(x))
            return false;
    }
    return true;
}

function or(validatorsArray, x) {
    for (const validator of validatorsArray) {
        if (validator.check(x))
            return true;
    }

    return false;
}

function xor(validatorsArray, x) {
    var result;
    for (const validator of validatorsArray) {
        if (result === undefined)
            result = validator.check(x);
        else
            result ^= validator.check(x);
    }
    return Boolean(result);
}
},{}],3:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class AfterNth extends Validator {
    constructor(n, pattern, validator) {
        super();
        const escape_pattern = Validator.escapeSymbols(pattern);
        this.regex = new RegExp(`(?:[^${escape_pattern}]*${escape_pattern}){${n}}(.+$)`);
        this.validator = validator;
    }
    check(x) {
        return Validator.checkMatch(x, this.regex, this.validator, 1);
    }
}
},{"./Validator":31}],4:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class Anything extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return true;
    }
}
},{"./Validator":31}],5:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class BeforeNth extends Validator {
    constructor(n, pattern, validator) {
        super();
        const escape_pattern = Validator.escapeSymbols(pattern);
        this.escape_pattern = escape_pattern;
        this.regex = new RegExp(`^([^${escape_pattern}]*${escape_pattern}){${n}}`);
        this.validator = validator;
    }
    check(x) {
        const match_array = x.match(this.regex);
        if (match_array) {
            const beforeNth = match_array[0].slice(0, -this.escape_pattern.length);
            return this.validator.check(beforeNth);
        } else {
            return false;
        }
    }
}
},{"./Validator":31}],6:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class EndWith extends Validator {
    constructor(pattern) {
        super();
        const escape_pattern = Validator.escapeSymbols(pattern);
        this.regex = new RegExp(`${escape_pattern}$`);
    }
    check(x) {
        return Validator.test(this.regex, x);
    }
}
},{"./Validator":31}],7:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class EndWithNon extends Validator {
    constructor(pattern) {
        super();
        const escape_pattern = Validator.escapeSymbols(pattern);
        this.regex = new RegExp(`[^${escape_pattern}]$`);
    }
    check(x) {
        return Validator.test(this.regex, x);
    }
}
},{"./Validator":31}],8:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class Exclude extends Validator {
    constructor(pattern) {
        super();
        const escape_pattern = Validator.escapeSymbols(pattern);
        this.regex = new RegExp(`^[^${escape_pattern}]+$`);
    }
    check(x) {
        return Validator.test(this.regex, x);
    }
}
},{"./Validator":31}],9:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class FirstN extends Validator {
    constructor(n, validator) {
        super();
        this.regex = new RegExp(`^.{${n}}`);
        this.validator = validator;
    }
    check(x) {
        return Validator.checkMatch(x, this.regex, this.validator, 0);
    }
}
},{"./Validator":31}],10:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class Has extends Validator {
    constructor(pattern) {
        super();
        const escape_pattern = Validator.escapeSymbols(pattern);
        this.regex = new RegExp(escape_pattern);
    }
    check(x) {
        return Validator.test(this.regex, x);
    }
}
},{"./Validator":31}],11:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class HasN extends Validator {
    constructor(n, pattern) {
        super();
        const escape_pattern = Validator.escapeSymbols(pattern);
        this.regex = new RegExp(escape_pattern, 'g');
        this.n = n;
    }
    check(x) {
        return x.match(this.regex).length === this.n;
    }
}
},{"./Validator":31}],12:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class IsAlphabet extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^[a-zA-Z]+$/, x);
    }
}
},{"./Validator":31}],13:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class IsChinese extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^[\u4e00-\u9fbb\u3400-\u4DBF]$/, x);
    }
}
},{"./Validator":31}],14:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class IsEmail extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, x);
    }
}
},{"./Validator":31}],15:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class IsIP extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/, x);
    }
}
},{"./Validator":31}],16:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class IsInt extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^\d+$/, x);
    }
}
},{"./Validator":31}],17:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class IsLowerCase extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^[a-z]+$/, x);
    }
}
},{"./Validator":31}],18:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class IsUpperCase extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^[A-Z]+$/, x);
    }
}
},{"./Validator":31}],19:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class IsWord extends Validator {
    constructor() {
        super();
    }
    check(x) {
        return Validator.test(/^[\w]+$/, x);
    }
}
},{"./Validator":31}],20:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class FirstN extends Validator {
    constructor(n, validator) {
        super();
        this.regex = new RegExp(`.{${n}}$`);
        this.validator = validator;
    }
    check(x) {
        return Validator.checkMatch(x, this.regex, this.validator, 0);
    }
}
},{"./Validator":31}],21:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class LenBtw extends Validator {
    constructor(m, n) {
        super();
        this.m = m;
        this.n = n;
    }
    check(x) {
        return x.length >= this.m && x.length <= this.n;
    }
}
},{"./Validator":31}],22:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class LenEq extends Validator {
    constructor(n) {
        super();
        this.n = n;
    }
    check(x) {
        return x.length === this.n;
    }
}
},{"./Validator":31}],23:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class LenGeq extends Validator {
    constructor(n) {
        super();
        this.n = n;
    }
    check(x) {
        return x.length >= this.n;
    }
}
},{"./Validator":31}],24:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class LenGt extends Validator {
    constructor(n) {
        super();
        this.n = n;
    }
    check(x) {
        return x.length > this.n;
    }
}
},{"./Validator":31}],25:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class LenLeq extends Validator {
    constructor(n) {
        super();
        this.n = n;
    }
    check(x) {
        return x.length <= this.n;
    }
}
},{"./Validator":31}],26:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class LenLt extends Validator {
    constructor(n) {
        super();
        this.n = n;
    }
    check(x) {
        return x.length < this.n;
    }
}
},{"./Validator":31}],27:[function(require,module,exports){
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
},{"./Validator":31}],28:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class Regex extends Validator {
    constructor(regex) {
        super();
        this.regex = regex;
    }
    check(x) {
        return Validator.test(this.regex, x);
    }
}
},{"./Validator":31}],29:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class StartWith extends Validator {
    constructor(pattern) {
        super();
        const escape_pattern = Validator.escapeSymbols(pattern);
        this.regex = new RegExp(`^${escape_pattern}`);
    }
    check(x) {
        return Validator.test(this.regex, x);
    }
}
},{"./Validator":31}],30:[function(require,module,exports){
const Validator = require('./Validator');

module.exports = class StartWithNon extends Validator {
    constructor(pattern) {
        super();
        const escape_pattern = Validator.escapeSymbols(pattern);
        this.regex = new RegExp(`^[^${escape_pattern}]`);
    }
    check(x) {
        return Validator.test(this.regex, x);
    }
}
},{"./Validator":31}],31:[function(require,module,exports){
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
},{}],32:[function(require,module,exports){
const AfterNth = require('./AfterNth');
const Anything = require('./Anything');
const BeforeNth = require('./BeforeNth');
const EndWith = require('./EndWith');
const EndWithNon = require('./EndWithNon');
const Exclude = require('./Exclude');
const FirstN = require('./FirstN');
const Has = require('./Has');
const HasN = require('./HasN');
const IsAlphabet = require('./IsAlphabet');
const IsChinese = require('./IsChinese');
const IsEmail = require('./IsEmail');
const IsInt = require('./IsInt');
const IsIP = require('./IsIP');
const IsLowerCase = require('./IsLowerCase');
const IsUpperCase = require('./IsUpperCase');
const IsWord = require('./IsWord');
const LastN = require('./LastN');
const LenBtw = require('./LenBtw');
const LenEq = require('./LenEq');
const LenGeq = require('./LenGeq');
const LenGt = require('./LenGt');
const LenLeq = require('./LenLeq');
const LenLt = require('./LenLt');
const QuoteBy = require('./QuoteBy');
const Regex = require('./Regex');
const StartWith = require('./StartWith');
const StartWithNon = require('./StartWithNon');

module.exports = {
    AfterNth: (...args) => new AfterNth(...args),
    Anything: (...args) => new Anything(...args),
    BeforeNth: (...args) => new BeforeNth(...args),
    EndWith: (...args) => new EndWith(...args),
    EndWithNon: (...args) => new EndWithNon(...args),
    Exclude: (...args) => new Exclude(...args),
    FirstN: (...args) => new FirstN(...args),
    Has: (...args) => new Has(...args),
    HasN: (...args) => new HasN(...args),
    IsAlphabet: (...args) => new IsAlphabet(...args),
    IsChinese: (...args) => new IsChinese(...args),
    IsEmail: (...args) => new IsEmail(...args),
    IsInt: (...args) => new IsInt(...args),
    IsIP: (...args) => new IsIP(...args),
    IsLowerCase: (...args) => new IsLowerCase(...args),
    IsUpperCase: (...args) => new IsUpperCase(...args),
    IsWord: (...args) => new IsWord(...args),
    LastN: (...args) => new LastN(...args),
    LenBtw: (...args) => new LenBtw(...args),
    LenEq: (...args) => new LenEq(...args),
    LenGeq: (...args) => new LenGeq(...args),
    LenGt: (...args) => new LenGt(...args),
    LenLeq: (...args) => new LenLeq(...args),
    LenLt: (...args) => new LenLt(...args),
    QuoteBy: (...args) => new QuoteBy(...args),
    Regex: (...args) => new Regex(...args),
    StartWith: (...args) => new StartWith(...args),
    StartWithNon: (...args) => new StartWithNon(...args),
}

// const fs = require('fs');
// const dirs = fs.readdirSync('./');
// const arr = dirs
//     .map(dir => dir.replace('.js', ''))
//     .filter(dir => dir !== 'index' && dir !== 'Validator');

// for (const dir of arr)
    // console.log(`const ${dir} = require('./${dir}');`);
    // console.log(`    ${dir}: (...args) => new ${dir}(...args),`);
},{"./AfterNth":3,"./Anything":4,"./BeforeNth":5,"./EndWith":6,"./EndWithNon":7,"./Exclude":8,"./FirstN":9,"./Has":10,"./HasN":11,"./IsAlphabet":12,"./IsChinese":13,"./IsEmail":14,"./IsIP":15,"./IsInt":16,"./IsLowerCase":17,"./IsUpperCase":18,"./IsWord":19,"./LastN":20,"./LenBtw":21,"./LenEq":22,"./LenGeq":23,"./LenGt":24,"./LenLeq":25,"./LenLt":26,"./QuoteBy":27,"./Regex":28,"./StartWith":29,"./StartWithNon":30}]},{},[1]);
