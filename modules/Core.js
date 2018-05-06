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