export declare function count<T>(input: AsyncIterable<T>, predicate?: (value: T) => Promise<boolean> | boolean): AsyncIterable<number>;
export declare function max<T = number>(input: AsyncIterable<T>, comparer?: (a: T, b: T) => number): AsyncIterable<T>;
export declare function min<T = number>(input: AsyncIterable<T>, comparer?: (a: T, b: T) => number): AsyncIterable<T>;
export declare function reduce<T, K = T>(input: AsyncIterable<T>, fn: (acc: K, curr: T) => K, seed: K): AsyncIterable<K>;
