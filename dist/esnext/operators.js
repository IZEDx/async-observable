export async function* map(input, fn) {
    for await (const data of input) {
        const mapped = fn(data);
        yield mapped instanceof Promise ? await mapped : mapped;
    }
}
export async function* split(input, seperator) {
    for await (const data of input) {
        for (const part of data.split(seperator)) {
            yield part;
        }
    }
}
export async function* buffer(input, seperator) {
    let buff = "";
    for await (const data of input) {
        buff += data;
        let idx = buff.indexOf(seperator);
        while (idx >= 0) {
            yield buff.substr(0, idx);
            buff = buff.substr(idx + seperator.length);
            idx = buff.indexOf(seperator);
        }
    }
}
export async function* filter(input, fn) {
    for await (const data of input) {
        const check = fn(data);
        if (check instanceof Promise ? await check : check) {
            yield data;
        }
    }
}
export async function* forEach(input, fn) {
    for await (const data of input) {
        const run = fn(data);
        if (run instanceof Promise) {
            await fn(data);
        }
        else {
            fn(data);
        }
        yield data;
    }
}
export async function* flatMap(input, fn) {
    for await (const data of input) {
        yield* fn(data);
    }
}
export async function* count(input, predicate) {
    let c = 0;
    for await (const _ of !!predicate ? filter(input, predicate) : input) {
        c++;
    }
    yield c;
}
export async function* max(input, comparer) {
    if (!comparer) {
        comparer = (a, b) => {
            if (typeof a !== "number" || typeof b !== "number") {
                throw TypeError("Input must be number when no comparer is given.");
            }
            return a > b ? 1 : -1;
        };
    }
    let max = null;
    for await (const val of input) {
        if (max === null) {
            max = val;
        }
        else {
            max = comparer(val, max) > 0 ? val : max;
        }
    }
    if (max !== null) {
        yield max;
    }
}
export async function* min(input, comparer) {
    if (!comparer) {
        comparer = (a, b) => {
            if (typeof a !== "number" || typeof b !== "number") {
                throw TypeError("Input must be number when no comparer is given.");
            }
            return a < b ? 1 : -1;
        };
    }
    else {
        const origcomp = comparer;
        comparer = (a, b) => {
            return origcomp(a, b) < 0 ? 1 : -1;
        };
    }
    return max(input, comparer);
}
export async function* reduce(input, fn, seed) {
    let acc = seed;
    for await (const curr of input) {
        yield acc = fn(acc, curr);
    }
}
//# sourceMappingURL=operators.js.map