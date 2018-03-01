
import { Filters } from "./";

export async function* count<T>(input: AsyncIterable<T>, predicate?: (value: T) => Promise<boolean>|boolean): AsyncIterable<number> {
    let c = 0;
    for await(const _ of !!predicate ? Filters.filter(input, predicate) : input) {
        c++;
    }
    yield c;
}

export async function* max<T = number>(input: AsyncIterable<T>, comparer?: (a: T, b: T) => number): AsyncIterable<T> {
    if (!comparer) {
        comparer = (a: T, b: T) => {
            if (typeof a !== "number" || typeof b !== "number") {
                throw TypeError("Input must be number when no comparer is given.");
            }
            return a > b ? 1 : -1;
        }
    }

    let max: T|null = null;
    for await(const val of input) {
        if (max === null) {
            max = val;
        } else {
            max = comparer(val, max) > 0 ? val : max;
        }
    }
    if (max !== null) {
        yield max;
    }
}

export async function* min<T = number>(input: AsyncIterable<T>, comparer?: (a: T, b: T) => number): AsyncIterable<T> {
    if (!comparer) {
        comparer = (a: T, b: T) => {
            if (typeof a !== "number" || typeof b !== "number") {
                throw TypeError("Input must be number when no comparer is given.");
            }
            return a < b ? 1 : -1;
        }
    } else {
        const origcomp = comparer;
        comparer = (a: T, b: T) => {
            return origcomp(a, b) < 0 ? 1 : -1;
        }
    }

    return max(input, comparer);
}

export async function* reduce<T, K = T>(input: AsyncIterable<T>, fn: (acc: K, curr: T) => K, seed: K): AsyncIterable<K> {
    let acc = seed;
    for await(const curr of input) {
        yield acc = fn(acc, curr);
    }
}
