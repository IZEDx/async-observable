import { Generators, Operators, MaybePromise, IObserver, Emitter, Subscription, AsyncGenerator } from ".";
import { CompareFunction } from "./operators/aggregators";

export interface ReadableStream {
    on(event: "error", cb: (err: Error) => void): void;
    on(event: "close", cb: (hadErr: boolean) => void): void;
    on(event: "data", cb: (data: any) => void): void;
    on(event: string, cb: Function): void;
}

export type FuncCallback<T, K> = (val: T, callback: (err: any, v: K) => any) => any;
export type FuncPromise<T, K> = (val: T) => Promise<K>;

export type FuncAsyncIterable<T> = (...args: any[]) => AsyncIterable<T>;
export type FuncCleanableAsyncIterable<T> = (...args: any[]) => CleanableAsyncIterable<T>;

export class CleanableAsyncIterable<T> implements AsyncIterable<T> {
     [Symbol.asyncIterator]: () => AsyncIterator<T>;

    constructor(ai: AsyncIterable<T>, public cleanup: () => void) {
        Object.assign(this, ai);
    }
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
    cleanup: () => void = () => {};

    constructor(ai: AsyncIterable<T>|CleanableAsyncIterable<T>|FuncCleanableAsyncIterable<T>) {
        if (ai instanceof Function) {
            this[Symbol.asyncIterator] = () => {
                const cleanable = ai();
                const iter = cleanable[Symbol.asyncIterator]();
                this.cleanup = cleanable.cleanup;
                return iter;
            };
        } else {
            Object.assign(this, ai);
        }
    }

    // ---------------------------------------------------------
    // --------------------  Generators  -----------------------
    // ---------------------------------------------------------

    static duration(ms: number): Observable<number> {
        return Observable.interval(1, ms).map(v => v / ms);
    }

    static interval(ms: number, max: number): Observable<number> {
        return Observable.wrapGenerator(Generators.interval, ms, max);
    }

    static of<T>(...values: (T|Promise<T>)[]): Observable<T> {
        return Observable.from(values);
    }

    static range(from: number, to: number, step: number = 1): Observable<number> {
        return Observable.wrapGenerator(Generators.range, from, to, step);
    }

    static fibonacci(iterations?: number): Observable<number> {
        return Observable.wrapGenerator(Generators.fibonacci, iterations);
    }

    static random(min = 0, max = 1, count: number = Infinity): Observable<number> {
        return Observable.wrapGenerator(Generators.random, min, max, count);
    }


    static callback<T, K>(val: T, fn: (val: T, callback: (err: any, v: K) => any) => any): Observable<K> {
        let returned = false;
        return Observable.create(observer => {
            fn(val, (err, v) => {
                if (!returned) {
                    if (err) {
                        observer.throw(err);
                    } else {
                        observer.next(v);
                        observer.return();
                    }
                }
            });
        });
    }

    static from<T>(it: Iterable<T|Promise<T>>): Observable<T> {
        return Observable.wrapGenerator<T>(Generators.from, it);
    }

    static listen<T>(stream: ReadableStream): Observable<T> {
        return Observable.create(observer => {
            stream.on("error", err      => observer.throw(err));
            stream.on("close", hadError => observer.return());
            stream.on("data",  data     => observer.next(data));
        });
    }

    static create<T>(emitter: Emitter<T>): Observable<T> {
        return Observable.wrapGenerator<T>(Generators.create, emitter);
    }

    // ---------------------------------------------------------
    // ----------------------  Cleaning  -----------------------
    // ---------------------------------------------------------
    
    private static wrapGenerator<T>(generator: AsyncGenerator<T>, ...args: any[]): Observable<T> {
        return new Observable(() => {
            let cleanup: Function = () => {};
            return new CleanableAsyncIterable(generator(cb => cleanup = cb, ...args), () => cleanup());
        });
    }

    private wrapOperator<K>(itfunc: FuncAsyncIterable<K>, ...args: any[]): Observable<K> {
        return new Observable<K>(() => new CleanableAsyncIterable(itfunc(...args), this.cleanup));
    }

    // ---------------------------------------------------------
    // --------------------  Aggregators  ----------------------
    // ---------------------------------------------------------


    /**
     * max listens on this input observable and yields the element with
     * the maximum value when the input is completed.
     * When the input type is not a number, a custom comparer has to be passed
     * to compare the values.
     * @param {T extends number ? undefined : (a: T, b: T) => 1|0|-1} comparer Required for non-number values.
     */
    max<T extends number>(comparer?: CompareFunction<T>): Observable<T>;
    max(comparer: CompareFunction<T>): Observable<T> {
        return this.wrapOperator(() => Operators.compare(this, comparer 
            ? comparer 
            : (a, b) => a > b ? 1 : -1
        ));
    }

    min<T extends number>(comparer?: CompareFunction<T>): Observable<T>;
    min(comparer: CompareFunction<T>): Observable<T> {
        return this.wrapOperator(() => Operators.compare(this, comparer 
            ? ((a, b) => comparer(a,b) < 0 ? 1 : -1)
            : ((a, b) => a > b ? 1 : -1)
        ));
    }
 
    reduce<K = T>(fn: (acc: K, curr: T) => K, seed: K): Observable<K> {
        return this.wrapOperator(() => Operators.reduce(this, fn, seed));
    }

    // ---------------------------------------------------------
    // ----------------------  Filters  ------------------------
    // ---------------------------------------------------------

    checkValid(): Observable<T> {
        return this.where(v => v !== undefined && v !== null);
    }

    where(fn: (value: T) => MaybePromise<boolean>): Observable<T> {
        return this.filter(fn);
    }

    filter(fn: (value: T) => MaybePromise<boolean>): Observable<T> {
        return this.wrapOperator(() => Operators.filter(this, fn));
    }
    

    // ---------------------------------------------------------
    // -------------------  Transformators  --------------------
    // ---------------------------------------------------------

    map<K>(fn: (value: T) => MaybePromise<K>): Observable<K> {
        return this.wrapOperator(() => Operators.map(this, fn));
    }

    flatMap<K>(fn: (value: T) => Observable<K>): Observable<K> {
        return this.wrapOperator(() => Operators.flatMap(this, fn));
    }

    // ---------------------------------------------------------
    // ---------------------  Utilities  -----------------------
    // ---------------------------------------------------------


    do(fn: (value: T) => MaybePromise<void>): Observable<T> { return this.forEach(fn); }
    forEach(fn: (value: T) => MaybePromise<void>): Observable<T> {
        return this.wrapOperator(() => Operators.forEach(this, fn));
    }


    // ---------------------------------------------------------
    // -----------------------  Sinks  -------------------------
    // ---------------------------------------------------------


    async count(predicate?: (value: T) => Promise<boolean>|boolean): Promise<number> {
        let c = 0;
        for await(const _ of !!predicate ? this.filter(predicate) : this) {
            c++;
        }
        return c;
    }

    async first(): Promise<T> {
        for await(const el of this) {
            return el;
        }
        throw new Error("No value received.");
    }

    async last(): Promise<T> {
        let last: T|undefined;
        for await(const el of this) {
            last = el;
        }
        if (last === undefined)  {
            throw new Error("No value received.");
        } else {
            return last;
        }
    }

    async toArray(): Promise<T[]> {
        const elements: T[] = [];
        for await(const el of this) {
            elements.push(el);
        }
        return elements;
    }

    assign<U extends {[K in keyof U]: U[K]}, K extends keyof U>(object: U, key: K): Subscription<T> {
        return this.subscribe(val => object[key] = val);
    }

    subscribe<K extends IObserver<T>>(observer?: K|((value: T) => void)): Subscription<T> {
        return new Subscription(this, observer instanceof Function ? {next: observer} : observer);
    }

}