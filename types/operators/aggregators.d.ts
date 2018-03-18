export declare function count<T>(input: AsyncIterable<T>, predicate?: (value: T) => Promise<boolean> | boolean): AsyncIterable<number>;
export declare type CompareFunction<T> = (a: T, b: T) => 1 | 0 | -1;
export declare type AssumeCompareType<T, U> = T extends U ? CompareFunction<U> | undefined : CompareFunction<T>;
export declare function max<T extends number>(input: AsyncIterable<T>, comparer?: CompareFunction<T>): AsyncIterable<T>;
export declare function max<T>(input: AsyncIterable<T>, comparer: CompareFunction<T>): AsyncIterable<T>;
export declare function min<T extends number>(input: AsyncIterable<T>, comparer?: CompareFunction<T>): AsyncIterable<T>;
export declare function min<T>(input: AsyncIterable<T>, comparer: CompareFunction<T>): AsyncIterable<T>;
export declare function reduce<T, K = T>(input: AsyncIterable<T>, fn: (acc: K, curr: T) => K, seed: K): AsyncIterable<K>;
