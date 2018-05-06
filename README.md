# legex (lesser regex)
Regular Expression is too difficult to me, so I am looking for a descriptive way to write validators and combining validators by logic gate to generate new validator. And after I finished this library, I found that I can write 'native' Regular Expression now...

## Installation
```bash
npm i git+https://github.com/AoiYamada/legex --save
```

## Usage
```javascript
const legex = require('legex');
// bundled file at 'legex/dist/' for browser

const c = legex.C;
const v = legex.V;

// Example of construction of Email Validation:

// Condition1 before '@':
const beforeAtType1 = c.And(
             new v.StartWithNon('<>()[]\\.,;:@ '), // not start with '<>()[]\\.,;:@ '
             new v.HasN(1, '@'), // has one '@''
             new v.BeforeNth(
                1, '@', // before the first '@'
                new v.Exclude('<>()[]\\,;:@ ') // do not contain '<>()[]\\,;:@ '
             )
           );

// Condition2 before '@':
const beforeAtType2 = new v.BeforeNth(
              1, '@', // before the first '@'
              new v.QuoteBy(
                '"', '"',
                new v.Anything()
              )
            );

// Combination of Conditions before '@':
const beforeAt = c.Or(beforeAtType1, beforeAtType2);

// Condition1 after '@':
const afterAtType1 = new v.AfterNth(
              1,'@', // after the first '@'
              new v.QuoteBy(
                '[',']',
                new v.IsIP() // format of IP
              )
             );

// A Validator for checking does the string contain at least 2 alphabets (and alphabets only)
const alphabets = c.And(
            new v.IsAlphabet(), // alphabets
            new v.LenGeq(2) // more than 2(inclusive)
         );

// Condition2 after '@':
const afterAtType2 = c.And(
            new v.AfterNth(
                1,'@', // after the first '@'
                new v.BeforeNth(
                    1, '.', // before the first '.'
                    new v.IsWord() // is word character (a-z, A-Z, 0-9, _)
                  )
              ), 
            new v.AfterNth(
                1,'@', // after the first '@'
                new v.AfterNth(
                    1, '.', // after the first '.'
                    alphabets // contains at least 2 alphabets
                  )
              )
          );

// Combination of Conditions after '@':
const afterAt = c.Or(afterAtType1, afterAtType2);

// A full email Validator (It is not 100% correct, seems some conditions are wrong)
const email = c.And(beforeAt, afterAt);

// Tests:
console.log('Valid emails:');
assert('aaa@aaa.dds', email('aaa@aaa.dds') === true, 'should be true');
assert('aaa@aaa.dd', email('aaa@aaa.dd') === true, 'should be true');
assert('aaa@[192.168.0.1]', email('aaa@[192.168.0.1]') === true, 'should be true');
assert('\".....\"@aaa.dds', email('\".....\"@aaa.dds') === true, 'should be true');
assert('simple@example.com', email('simple@example.com') === true, 'should be true');
assert('very.common@example.com', email('very.common@example.com') === true, 'should be true');
assert('disposable.style.email.with+symbol@example.com', email('disposable.style.email.with+symbol@example.com') === true, 'should be true');
assert('other.email-with-dash@example.com', email('other.email-with-dash@example.com') === true, 'should be true');
assert('fully-qualified-domain@example.com', email('fully-qualified-domain@example.com') === true, 'should be true');
assert('user.name+tag+sorting@example.com', email('user.name+tag+sorting@example.com') === true, 'should be true');
assert('#!$%&\'*+-/=?^_`{}|~@example.org', email('#!$%&\'*+-/=?^_`{}|~@example.org') === true, 'should be true');

console.log('Invalid emails:');
assert('.aaa@aaa.dds', email('.aaa@aaa.dds') === false, 'should be false');
assert('aaa@aaa.d', email('aaa@aaa.d') === false, 'should be false');
assert('aaa@aaa.d4s', email('aaa@aaa.d4s') === false, 'should be false');
assert('aaa@[19.23.2]', email('aaa@[19.23.2]') === false, 'should be false');
assert('.....@aaa.dds', email('.....@aaa.dds') === false, 'should be false');

// Email validation is common, so this library has a true validation for that XD
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
console.log('Valid emails:');
assert('aaa@aaa.dds', new v.IsEmail().check('aaa@aaa.dds') === true, 'should be true');
assert('aaa@aaa.dd', new v.IsEmail().check('aaa@aaa.dd') === true, 'should be true');
assert('aaa@[192.168.0.1]', new v.IsEmail().check('aaa@[192.168.0.1]') === true, 'should be true');
assert('\".....\"@aaa.dds', new v.IsEmail().check('\".....\"@aaa.dds') === true, 'should be true');
assert('simple@example.com', email('simple@example.com') === true, 'should be true');
assert('very.common@example.com', email('very.common@example.com') === true, 'should be true');
assert('disposable.style.email.with+symbol@example.com', email('disposable.style.email.with+symbol@example.com') === true, 'should be true');
assert('other.email-with-dash@example.com', email('other.email-with-dash@example.com') === true, 'should be true');
assert('fully-qualified-domain@example.com', email('fully-qualified-domain@example.com') === true, 'should be true');
assert('user.name+tag+sorting@example.com', email('user.name+tag+sorting@example.com') === true, 'should be true');
assert('#!$%&\'*+-/=?^_`{}|~@example.org', email('#!$%&\'*+-/=?^_`{}|~@example.org') === true, 'should be true');

console.log('Invalid emails:');
assert('.aaa@aaa.dds', new v.IsEmail().check('.aaa@aaa.dds') === false, 'should be false');
assert('aaa@aaa.d', new v.IsEmail().check('aaa@aaa.d') === false, 'should be false');
assert('aaa@aaa.d4s', new v.IsEmail().check('aaa@aaa.d4s') === false, 'should be false');
assert('aaa@[19.23.2]', new v.IsEmail().check('aaa@[19.23.2]') === false, 'should be false');
assert('.....@aaa.dds', new v.IsEmail().check('.....@aaa.dds') === false, 'should be false');

// helper
function assert(description, boolean, msg) {
  console.log(description);
  if (!boolean)
    throw new Error(msg);
  else
    console.log('pass');
}
```

## Test

Test cases not yet finish

```bash
npm test
```

## Build
```bash
npm run build
```