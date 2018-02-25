import { IAsyncIterable } from "./asynciterable";
import { Observer } from "./observer";
export declare function callback<T, K>(val: T, fn: (val: T, callback: (err: any, v: K) => any) => any): IAsyncIterable<K>;
export declare function interval(ms: number, max: number): IAsyncIterable<number>;
export declare function of<T>(...values: (T | Promise<T>)[]): IAsyncIterable<T>;
export declare function range(from: number, to: number, step?: number): IAsyncIterable<number>;
export declare function create<T>(creator: (observer: Observer<T>) => void): IAsyncIterable<T>;
