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
const Validator = require('./Validator');

module.exports = {
    AfterNth,
    Anything,
    BeforeNth,
    EndWith,
    EndWithNon,
    Exclude,
    FirstN,
    Has,
    HasN,
    IsAlphabet,
    IsChinese,
    IsEmail,
    IsInt,
    IsIP,
    IsLowerCase,
    IsUpperCase,
    IsWord,
    LastN,
    LenBtw,
    LenEq,
    LenGeq,
    LenGt,
    LenLeq,
    LenLt,
    QuoteBy,
    Regex,
    StartWith,
    StartWithNon,
    Validator,
}

// const fs = require('fs');
// const dirs = fs.readdirSync('./');
// const arr = dirs
//     .map(dir => dir.replace('.js', ''));

// for (const dir of arr)
    // console.log(`const ${dir} = require('./${dir}');`);
    // console.log(`${dir},`);