import { ObserverFunction } from "./observer";
export declare type AsyncGenerator<T> = (args: any[]) => AsyncIterable<T>;
export declare function callback<T, K>(val: T, fn: (val: T, callback: (err: any, v: K) => any) => any): AsyncIterable<K>;
export declare function interval(ms: number, max: number): AsyncIterable<number>;
export declare function of<T>(...values: (T | Promise<T>)[]): AsyncIterable<T>;
export declare function range(from: number, to: number, step?: number): AsyncIterable<number>;
export declare function create<T>(creator: ObserverFunction<T>): AsyncIterable<T>;
