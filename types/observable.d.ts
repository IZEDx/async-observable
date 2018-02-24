/// <reference types="node" />
import { IAsyncIterable } from "./asynciterable";
import { IObserver } from "./observer";
export declare class Observable<T> {
    [Symbol.asyncIterator]: () => AsyncIterator<T>;
    constructor(ai: IAsyncIterable<T>);
    static of<T>(...values: (T | Promise<T>)[]): Observable<T>;
    static create<T>(creator: (observer: IObserver<T>) => void): Observable<T>;
    static interval(ms: number): Observable<number>;
    static range(from: number, to: number, step?: number): Observable<number>;
    static listen<T>(stream: NodeJS.ReadableStream): Observable<T>;
    checkValid(): Observable<T>;
    do(fn: (value: T) => Promise<void> | void): Observable<T>;
    pipe(consumer: IObserver<T>): Promise<void>;
    forEach(fn: (value: T) => Promise<void> | void): Observable<T>;
    subscribe(consumer: IObserver<T>): Promise<void>;
    filter(fn: (value: T) => Promise<boolean> | boolean): Observable<T>;
    map<K>(fn: (value: T) => Promise<K> | K): Observable<K>;
    flatMap<K>(fn: (value: T) => Observable<K>): Observable<K>;
}
