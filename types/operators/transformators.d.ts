export declare function map<T, K>(input: AsyncIterable<T>, fn: (value: T) => Promise<K> | K): AsyncIterable<K>;
export declare function buffer(input: AsyncIterable<string>, seperator: string): AsyncIterable<string>;
export declare function flatMap<T, K, O extends AsyncIterable<K>>(input: AsyncIterable<T>, fn: (value: T) => O): AsyncIterable<K>;
