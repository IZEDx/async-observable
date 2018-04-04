
import { IObserver, Observer, Emitter } from "./observer";
import { Generators as AsyncGenerators, Operators as AsyncOperators } from "./operators/";
import { MaybePromise } from ".";
import { CompareFunction } from "./operators/aggregators";
import { AsyncGenerator } from "./operators/generators";

export interface ReadableStream {
    on(event: "error", cb: (err: Error) => void): void;
    on(event: "close", cb: (hadErr: boolean) => void): void;
    on(event: "data", cb: (data: any) => void): void;
    on(event: string, cb: Function): void;
}

export interface Subscription {
    unsubscribe: () => void
    wait: Promise<void>
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

    constructor(ai: AsyncIterable<T>, private unsubscribe: () => void) {
        Object.assign(this, ai);
    }

    // ---------------------------------------------------------
    // --------------------  Generators  -----------------------
    // ---------------------------------------------------------

    static interval(ms: number, max: number): Observable<number> {
        return Observable.unsubscribable(AsyncGenerators.interval, ms, max);
    }

    static of<T>(...values: (T|Promise<T>)[]): Observable<T> {
        return Observable.unsubscribable<T>(AsyncGenerators.of, ...values);
    }

    static range(from: number, to: number, step: number = 1): Observable<number> {
        return Observable.unsubscribable(AsyncGenerators.range, from, to, step);
    }

    static fibonacci(iterations?: number): Observable<number> {
        return Observable.unsubscribable(AsyncGenerators.fibonacci, iterations);
    }

    static random(min = 0, max = 1, count: number = Infinity): Observable<number> {
        return Observable.unsubscribable(AsyncGenerators.random, min, max, count);
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
        return Observable.unsubscribable<T>(AsyncGenerators.create, emitter);
    }

    static unsubscribable<T>(generator: AsyncGenerator<T>, ...args: any[]): Observable<T> {
        let unsubscribe: Function = () => {};
        return new Observable(generator(cb => unsubscribe = cb, ...args), () => unsubscribe());
    }

    // ---------------------------------------------------------
    // --------------------  Aggregators  ----------------------
    // ---------------------------------------------------------

    count(predicate?: (value: T) => Promise<boolean>|boolean): Observable<number> {
        return new Observable(AsyncOperators.count(this, predicate), this.unsubscribe);
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
        return new Observable(AsyncOperators.max(this, comparer), this.unsubscribe);
    }

    min<T extends number>(comparer?: CompareFunction<T>): Observable<T>;
    min(comparer: CompareFunction<T>): Observable<T> {
        return new Observable(AsyncOperators.min(this, comparer), this.unsubscribe);
    }
 
    reduce<K = T>(fn: (acc: K, curr: T) => K, seed: K): Observable<K> {
        return new Observable(AsyncOperators.reduce(this, fn, seed), this.unsubscribe);
    }

    // ---------------------------------------------------------
    // ----------------------  Filters  ------------------------
    // ---------------------------------------------------------

    where(fn: (value: T) => MaybePromise<boolean>): Observable<T> {
        return this.filter(fn);
    }

    filter(fn: (value: T) => MaybePromise<boolean>): Observable<T> {
        return new Observable(AsyncOperators.filter(this, fn), this.unsubscribe);
    }

    // ---------------------------------------------------------
    // -------------------  Transformators  --------------------
    // ---------------------------------------------------------

    map<K>(fn: (value: T) => MaybePromise<K>): Observable<K> {
        return new Observable(AsyncOperators.map(this, fn), this.unsubscribe);
    }

    flatMap<K>(fn: (value: T) => Observable<K>): Observable<K> {
        return new Observable(AsyncOperators.flatMap(this, fn), this.unsubscribe);
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
        return new Observable(AsyncOperators.forEach(this, fn), this.unsubscribe);
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

    subscribe<K extends IObserver<T>>(subscriber: K): Subscription {
        let unsubscribed = false;
        const observer: Observer<T> = subscriber instanceof Observer
            ?   subscriber
            :   new Observer(subscriber);
            
        const promise = (async () => {
            try {
                for await(const data of this) {
                    if (unsubscribed) break;
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
        })();

        return {
            unsubscribe: () => {
                unsubscribed = true;
                this.unsubscribe();
            },
            wait: promise
        };
    }

}