
import { IObserver, Observer, Emitter } from "./observer";
import { Generators as AsyncGenerators, Operators as AsyncOperators } from "./operators/";
import { MaybePromise, immediate } from ".";
import { CompareFunction } from "./operators/aggregators";
import { AsyncGenerator } from "./operators/generators";

export interface ReadableStream {
    on(event: "error", cb: (err: Error) => void): void;
    on(event: "close", cb: (hadErr: boolean) => void): void;
    on(event: "data", cb: (data: any) => void): void;
    on(event: string, cb: Function): void;
}

export interface Subscription {
    unsubscribe: () => void;
    closed: boolean;
    wait: Promise<void>;
}

/**
 * An Observable produces an asynchronous stream of values once iterated over or subscribed on.
 * Observable methods operate on the asynchronous stream of values as they come by returning a new observable.
 * Using this it's possible to create an asynchronous operator chain.
 *
 * eg.
 * ```
 *  const myObservable = Observable.for(0, 100, 10).map(i => i += 5);
 *
 *  myObservable.subscribe({next: console.log});
 *
 *  for await(const i of myObservable) {
 *      console.log(i);
 *  }
 * ```
 */
export class Observable<T> implements AsyncIterable<T> {
    [Symbol.asyncIterator]: () => AsyncIterator<T>;

    constructor(ai: AsyncIterable<T>, private cleanup: () => void) {
        Object.assign(this, ai);
    }

    // ---------------------------------------------------------
    // --------------------  Generators  -----------------------
    // ---------------------------------------------------------

    static duration(ms: number): Observable<number> {
        return Observable.interval(1, ms).map(v => v / ms);
    }

    static interval(ms: number, max: number): Observable<number> {
        return Observable.cleanable(AsyncGenerators.interval, ms, max);
    }

    static of<T>(...values: (T|Promise<T>)[]): Observable<T> {
        return Observable.cleanable<T>(AsyncGenerators.of, ...values);
    }

    static range(from: number, to: number, step: number = 1): Observable<number> {
        return Observable.cleanable(AsyncGenerators.range, from, to, step);
    }

    static fibonacci(iterations?: number): Observable<number> {
        return Observable.cleanable(AsyncGenerators.fibonacci, iterations);
    }

    static random(min = 0, max = 1, count: number = Infinity): Observable<number> {
        return Observable.cleanable(AsyncGenerators.random, min, max, count);
    }


    static callback<T, K>(val: T, fn: (val: T, callback: (err: any, v: K) => any) => any): Observable<K> {
        return Observable.create(observer => {
            fn(val, (err, v) => {
                if (err) {
                    observer.throw(err);
                } else {
                    observer.next(v);
                    observer.return();
                }
            });
        });
    }

    static listen<T>(stream: ReadableStream): Observable<T> {
        return Observable.create(observer => {
            stream.on("error", err      => observer.throw(err));
            stream.on("close", hadError => observer.return());
            stream.on("data",  data     => observer.next(data));
        });
    }

    static create<T>(emitter: Emitter<T>): Observable<T> {
        return Observable.cleanable<T>(AsyncGenerators.create, emitter);
    }

    static cleanable<T>(generator: AsyncGenerator<T>, ...args: any[]): Observable<T> {
        let cleanup: Function = () => {};
        return new Observable(generator(cb => cleanup = cb, ...args), () => cleanup());
    }

    // ---------------------------------------------------------
    // --------------------  Aggregators  ----------------------
    // ---------------------------------------------------------

    count(predicate?: (value: T) => Promise<boolean>|boolean): Observable<number> {
        return new Observable(AsyncOperators.count(this, predicate), this.cleanup);
    }

    /**
     * max listens on this input observable and yields the element with
     * the maximum value when the input is completed.
     * When the input type is not a number, a custom comparer has to be passed
     * to compare the values.
     * @param {T extends number ? undefined : (a: T, b: T) => 1|0|-1} comparer Required for non-number values.
     */
    max<T extends number>(comparer?: CompareFunction<T>): Observable<T>;
    max(comparer: CompareFunction<T>): Observable<T> {
        return new Observable( AsyncOperators.compare(this, comparer 
            ? comparer 
            : (a, b) => a > b ? 1 : -1
        ), this.cleanup);
    }

    min<T extends number>(comparer?: CompareFunction<T>): Observable<T>;
    min(comparer: CompareFunction<T>): Observable<T> {
        return new Observable( AsyncOperators.compare(this, comparer 
            ? ((a, b) => comparer(a,b) < 0 ? 1 : -1)
            : ((a, b) => a > b ? 1 : -1)
        ), this.cleanup);
    }
 
    reduce<K = T>(fn: (acc: K, curr: T) => K, seed: K): Observable<K> {
        return new Observable(AsyncOperators.reduce(this, fn, seed), this.cleanup);
    }

    // ---------------------------------------------------------
    // ----------------------  Filters  ------------------------
    // ---------------------------------------------------------

    where(fn: (value: T) => MaybePromise<boolean>): Observable<T> {
        return this.filter(fn);
    }

    filter(fn: (value: T) => MaybePromise<boolean>): Observable<T> {
        return new Observable(AsyncOperators.filter(this, fn), this.cleanup);
    }

    // ---------------------------------------------------------
    // -------------------  Transformators  --------------------
    // ---------------------------------------------------------

    map<K>(fn: (value: T) => MaybePromise<K>): Observable<K> {
        return new Observable(AsyncOperators.map(this, fn), this.cleanup);
    }

    flatMap<K>(fn: (value: T) => Observable<K>): Observable<K> {
        return new Observable(AsyncOperators.flatMap(this, fn), this.cleanup);
    }

    // ---------------------------------------------------------
    // ---------------------  Utilities  -----------------------
    // ---------------------------------------------------------

    checkValid(): Observable<T> {
        return this.filter(v => v !== undefined && v !== null);
    }

    do(fn: (value: T) => MaybePromise<void>): Observable<T> {
        return this.forEach(fn);
    }

    forEach(fn: (value: T) => MaybePromise<void>): Observable<T> {
        return new Observable(AsyncOperators.forEach(this, fn), this.cleanup);
    }

    async toArray(): Promise<T[]> {
        const elements: T[] = [];
        for await(const el of this) {
            elements.push(el);
        }
        return elements;
    }

    assign<U extends {[K in keyof U]: U[K]}, K extends keyof U>(object: U, key: K): Subscription {
        return this.subscribe({
            next: val => {
                object[key] = val;
            }
        })
    }

    async run(subscription: Subscription, observer: Observer<T>) {
        try {
            for await(const data of this) {
                if (subscription.closed) break;
                const r = observer.next(data);
                if (r instanceof Promise) {
                    await r;
                }
            }
            const r = observer.return();
            if (r instanceof Promise) {
                await r;
            }
        } catch (e) {
            const r = observer.throw(e);
            if (r instanceof Promise) {
                await r;
            }
        }
    }

    subscribe<K extends IObserver<T>>(observer: K): Subscription {
        const obs: Observer<T> = observer instanceof Observer
            ?   observer
            :   new Observer(observer);

        const subscription: Subscription = {
            unsubscribe: () => {
                subscription.closed = true;
                this.cleanup();
            },
            closed: false,
            wait: immediate(() => this.run(subscription, obs))
        };

        return subscription;
    }

}