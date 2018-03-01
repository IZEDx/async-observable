export declare function filter<T>(input: AsyncIterable<T>, fn: (value: T) => Promise<boolean> | boolean): AsyncIterable<T>;
