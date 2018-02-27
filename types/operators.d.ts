export declare type AsyncOperator<T, K = T> = (input: AsyncIterable<T>, ...args: any[]) => AsyncIterable<K>;
export declare function map<T, K>(input: AsyncIterable<T>, fn: (value: T) => Promise<K> | K): AsyncIterable<K>;
export declare function split(input: AsyncIterable<string>, seperator: string): AsyncIterable<string>;
export declare function buffer(input: AsyncIterable<string>, seperator: string): AsyncIterable<string>;
export declare function filter<T>(input: AsyncIterable<T>, fn: (value: T) => Promise<boolean> | boolean): AsyncIterable<T>;
export declare function forEach<T>(input: AsyncIterable<T>, fn: (value: T) => Promise<void> | void): AsyncIterable<T>;
export declare function flatMap<T, K, O extends AsyncIterable<K>>(input: AsyncIterable<T>, fn: (value: T) => O): AsyncIterable<K>;
