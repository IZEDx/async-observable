
import { Filters } from "./";

    
export async function* count<T>(input: AsyncIterable<T>, predicate?: (value: T) => Promise<boolean>|boolean): AsyncIterable<number> {
    let c = 0;
    for await(const _ of !!predicate ? Filters.filter(input, predicate) : input) {
        c++;
    }
    yield c;
}

export type CompareFunction<T> = (a: T, b: T) => 1|0|-1;
export type AssumeCompareType<T, U> = T extends U ? CompareFunction<U>|undefined : CompareFunction<T>;
const numberComparer: CompareFunction<number> = (a: number, b: number) => a > b ? 1 : -1;

export function max<T extends number>(input: AsyncIterable<T>, comparer?: CompareFunction<T>): AsyncIterable<T>;
export function max<T>(input: AsyncIterable<T>, comparer: CompareFunction<T>): AsyncIterable<T>
export async function* max<T>(input: AsyncIterable<T>, comparer: AssumeCompareType<T, number>): AsyncIterable<T> {
    let comp = <CompareFunction<T>> (comparer || numberComparer);

    let max: T|null = null;
    for await(const val of input) {
        if (max === null) {
            max = val;
        } else {
            max = comp(val, max) > 0 ? val : max;
        }
    }
    if (max !== null) {
        yield max;
    }
}

export function min<T extends number>(input: AsyncIterable<T>, comparer?: CompareFunction<T>): AsyncIterable<T>;
export function min<T>(input: AsyncIterable<T>, comparer: CompareFunction<T>): AsyncIterable<T>
export async function* min<T>(input: AsyncIterable<T>, comparer: AssumeCompareType<T, number>): AsyncIterable<T> {
    let comp: CompareFunction<T> = <any>comparer || <any>numberComparer;

    return max(input, (a: T, b: T) => {
        return comp(a,b) < 0 ? 1 : -1;
    });
}

export async function* reduce<T, K = T>(input: AsyncIterable<T>, fn: (acc: K, curr: T) => K, seed: K): AsyncIterable<K> {
    let acc = seed;
    for await(const curr of input) {
        yield acc = fn(acc, curr);
    }
}
