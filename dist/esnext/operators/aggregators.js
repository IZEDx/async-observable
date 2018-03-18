import { Filters } from "./";
export async function* count(input, predicate) {
    let c = 0;
    for await (const _ of !!predicate ? Filters.filter(input, predicate) : input) {
        c++;
    }
    yield c;
}
const numberComparer = (a, b) => a > b ? 1 : -1;
export async function* max(input, comparer) {
    let comp = (comparer || numberComparer);
    let max = null;
    for await (const val of input) {
        if (max === null) {
            max = val;
        }
        else {
            max = comp(val, max) > 0 ? val : max;
        }
    }
    if (max !== null) {
        yield max;
    }
}
export async function* min(input, comparer) {
    let comp = comparer || numberComparer;
    return max(input, (a, b) => {
        return comp(a, b) < 0 ? 1 : -1;
    });
}
export async function* reduce(input, fn, seed) {
    let acc = seed;
    for await (const curr of input) {
        yield acc = fn(acc, curr);
    }
}
//# sourceMappingURL=aggregators.js.map