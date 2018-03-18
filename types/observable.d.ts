import { IObserver, ObserverFunction } from "./observer";
import { OptionalAsync } from ".";
import { CompareFunction } from "./operators/aggregators";
export interface ReadableStream {
    on(event: "error", cb: (err: Error) => void): void;
    on(event: "close", cb: (hadErr: boolean) => void): void;
    on(event: "data", cb: (data: any) => void): void;
    on(event: string, cb: Function): void;
}
export interface Subscription {
    cancel: () => void;
    wait: Promise<void>;
}
export declare class Observable<T> implements AsyncIterable<T> {
    [Symbol.asyncIterator]: () => AsyncIterator<T>;
    constructor(ai: AsyncIterable<T>);
    static callback<T, K>(val: T, fn: (val: T, callback: (err: any, v: K) => any) => any): Observable<K>;
    static interval(ms: number, max: number): Observable<number>;
    static of<T>(...values: (T | Promise<T>)[]): Observable<T>;
    static range(from: number, to: number, step?: number): Observable<number>;
    static fibonacci(iterations?: number): Observable<number>;
    static create<T>(creator: ObserverFunction<T>): Observable<T>;
    static listen<T>(stream: ReadableStream): Observable<T>;
    count(predicate?: (value: T) => Promise<boolean> | boolean): Observable<number>;
    max<T extends number>(comparer?: CompareFunction<T>): Observable<T>;
    min<T extends number>(comparer?: CompareFunction<T>): Observable<T>;
    reduce<K = T>(fn: (acc: K, curr: T) => K, seed: K): Observable<K>;
    filter(fn: (value: T) => OptionalAsync<boolean>): Observable<T>;
    map<K>(fn: (value: T) => OptionalAsync<K>): Observable<K>;
    flatMap<K>(fn: (value: T) => Observable<K>): Observable<K>;
    checkValid(): Observable<T>;
    do(fn: (value: T) => OptionalAsync<void>): Observable<T>;
    forEach(fn: (value: T) => OptionalAsync<void>): Observable<T>;
    assign<U extends {
        [K in keyof U]: U[K];
    }, K extends keyof U>(object: U, key: K): Subscription;
    subscribe<K extends IObserver<T>>(subscriber: K): Subscription;
}
