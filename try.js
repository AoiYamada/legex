function assert(description, boolean, msg) {
  console.log(description);
  if (!boolean)
    throw new Error(msg);
  else
    console.log('pass');
}

const c = legex.C;
const v = legex.V;

// Construction of Email Validation:

// Condition1 before '@':
const beforeAtType1 = c.And(
             v.StartWithNon('<>()[]\\.,;:@ '), // not start with '<>()[]\\.,;:@ '
             v.HasN(1, '@'), // has one '@''
             v.BeforeNth(
                1, '@', // before the first '@'
                v.Exclude('<>()[]\\,;:@ ') // do not contain '<>()[]\\,;:@ '
             )
           );

// Condition2 before '@':
const beforeAtType2 = v.BeforeNth(
              1, '@', // before the first '@'
              v.QuoteBy(
                '"', '"',
                v.Anything()
              )
            );

// Combination of Conditions before '@':
const beforeAt = c.Or(beforeAtType1, beforeAtType2);

// Condition1 after '@':
const afterAtType1 = v.AfterNth(
              1,'@', // after the first '@'
              v.QuoteBy(
                '[',']',
                v.IsIP() // format of IP
              )
             );

// A Validator for checking does the string contain at least 2 alphabets (and alphabets only)
const alphabets = c.And(
            v.IsAlphabet(), // alphabets
            v.LenGeq(2) // more than 2(inclusive)
         );

// Condition2 after '@':
const afterAtType2 = c.And(
            v.AfterNth(
                1,'@', // after the first '@'
                v.BeforeNth(
                    1, '.', // before the first '.'
                    v.IsWord() // is word character (a-z, A-Z, 0-9, _)
                  )
              ), 
            v.AfterNth(
                1,'@', // after the first '@'
                v.AfterNth(
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
assert('aaa@aaa.dds', v.IsEmail().check('aaa@aaa.dds') === true, 'should be true');
assert('aaa@aaa.dd', v.IsEmail().check('aaa@aaa.dd') === true, 'should be true');
assert('aaa@[192.168.0.1]', v.IsEmail().check('aaa@[192.168.0.1]') === true, 'should be true');
assert('\".....\"@aaa.dds', v.IsEmail().check('\".....\"@aaa.dds') === true, 'should be true');
assert('simple@example.com', email('simple@example.com') === true, 'should be true');
assert('very.common@example.com', email('very.common@example.com') === true, 'should be true');
assert('disposable.style.email.with+symbol@example.com', email('disposable.style.email.with+symbol@example.com') === true, 'should be true');
assert('other.email-with-dash@example.com', email('other.email-with-dash@example.com') === true, 'should be true');
assert('fully-qualified-domain@example.com', email('fully-qualified-domain@example.com') === true, 'should be true');
assert('user.name+tag+sorting@example.com', email('user.name+tag+sorting@example.com') === true, 'should be true');
assert('#!$%&\'*+-/=?^_`{}|~@example.org', email('#!$%&\'*+-/=?^_`{}|~@example.org') === true, 'should be true');

console.log('Invalid emails:');
assert('.aaa@aaa.dds', v.IsEmail().check('.aaa@aaa.dds') === false, 'should be false');
assert('aaa@aaa.d', v.IsEmail().check('aaa@aaa.d') === false, 'should be false');
assert('aaa@aaa.d4s', v.IsEmail().check('aaa@aaa.d4s') === false, 'should be false');
assert('aaa@[19.23.2]', v.IsEmail().check('aaa@[19.23.2]') === false, 'should be false');
assert('.....@aaa.dds', v.IsEmail().check('.....@aaa.dds') === false, 'should be false');