import { Emitter } from "../observer";
export declare type AsyncGenerator<T> = (onUnsubscribe: (callback: Function) => void, ...args: any[]) => AsyncIterable<T>;
export declare function interval(onUnsubscribe: (callback: Function) => void, ms: number, max: number): AsyncIterable<number>;
export declare function of<T>(onUnsubscribe: (callback: Function) => void, ...values: (T | Promise<T>)[]): AsyncIterable<T>;
export declare function range(onUnsubscribe: (callback: Function) => void, from: number, to: number, step?: number): AsyncIterable<number>;
export declare function fibonacci(onUnsubscribe: (callback: Function) => void, n?: number): AsyncIterable<number>;
export declare function random(onUnsubscribe: (callback: Function) => void, min?: number, max?: number, count?: number): AsyncIterable<number>;
export declare function create<T>(onUnsubscribe: (callback: Function) => void, emitter: Emitter<T>): AsyncIterable<T>;
