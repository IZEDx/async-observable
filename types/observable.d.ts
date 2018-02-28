import { IObserver, AsyncObserver } from "./observer";
export interface ReadableStream {
    on(event: "error", cb: (err: Error) => void): void;
    on(event: "close", cb: (hadErr: boolean) => void): void;
    on(event: "data", cb: (data: any) => void): void;
    on(event: string, cb: Function): void;
}
export declare class Observable<T> implements AsyncIterable<T> {
    [Symbol.asyncIterator]: () => AsyncIterator<T>;
    constructor(ai: AsyncIterable<T>);
    static of<T>(...values: (T | Promise<T>)[]): Observable<T>;
    static create<T>(creator: (observer: AsyncObserver<T>) => void): Observable<T>;
    static interval(ms: number): Observable<number>;
    static range(from: number, to: number, step?: number): Observable<number>;
    static listen<T>(stream: ReadableStream): Observable<T>;
    checkValid(): Observable<T>;
    do(fn: (value: T) => Promise<void> | void): Observable<T>;
    forEach(fn: (value: T) => Promise<void> | void): Observable<T>;
    filter(fn: (value: T) => Promise<boolean> | boolean): Observable<T>;
    map<K>(fn: (value: T) => Promise<K> | K): Observable<K>;
    flatMap<K>(fn: (value: T) => Observable<K>): Observable<K>;
    subscribe(subscriber: AsyncObserver<T> | IObserver<T>): Promise<void>;
}
