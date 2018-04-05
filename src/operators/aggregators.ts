
import { Filters } from "./";

    
export async function* count<T>(input: AsyncIterable<T>, predicate?: (value: T) => Promise<boolean>|boolean): AsyncIterable<number> {
    let c = 0;
    for await(const _ of !!predicate ? Filters.filter(input, predicate) : input) {
        c++;
    }
    yield c;
}

export type CompareFunction<T> = (a: T, b: T) => 1|0|-1;
export async function* compare<T>(input: AsyncIterable<T>, comparer: CompareFunction<T>): AsyncIterable<T> {
    let max: T|null = null;
    for await(const val of input) {
        if (max === null) {
            max = val;
        } else {
            max = comparer(val, max) >= 0 ? val : max;
        }
    }
    if (max !== null) {
        yield max;
    }
}

export async function* reduce<T, K = T>(input: AsyncIterable<T>, fn: (acc: K, curr: T) => K, seed: K): AsyncIterable<K> {
    let acc = seed;
    for await(const curr of input) {
        yield acc = fn(acc, curr);
    }
}
