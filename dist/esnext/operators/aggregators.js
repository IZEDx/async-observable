import { Filters } from "./";
export async function* count(input, predicate) {
    let c = 0;
    for await (const _ of !!predicate ? Filters.filter(input, predicate) : input) {
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
//# sourceMappingURL=aggregators.js.map