import { IAsyncIterable } from "./asynciterable";
export declare type AsyncOperator<T, K = T> = (input: IAsyncIterable<T>, ...args: any[]) => IAsyncIterable<K>;
export declare function map<T, K>(input: IAsyncIterable<T>, fn: (value: T) => Promise<K> | K): IAsyncIterable<K>;
export declare function split(input: IAsyncIterable<string>, seperator: string): IAsyncIterable<string>;
export declare function buffer(input: IAsyncIterable<string>, seperator: string): IAsyncIterable<string>;
export declare function filter<T>(input: IAsyncIterable<T>, fn: (value: T) => Promise<boolean> | boolean): IAsyncIterable<T>;
export declare function forEach<T>(input: IAsyncIterable<T>, fn: (value: T) => Promise<void> | void): IAsyncIterable<T>;
export declare function flatMap<T, K, O extends IAsyncIterable<K>>(input: IAsyncIterable<T>, fn: (value: T) => O): IAsyncIterable<K>;
