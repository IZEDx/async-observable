
import { Observer, Emitter, BufferedObserver, ObserverError } from "../observer";
import { Optional } from "..";

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * An AsyncGenerator is a function that creates an AsyncIterable
 */
export type AsyncGenerator<T> = (args: any[]) => AsyncIterable<T>;

/**
 * Creates an AsyncIterable from a Node-like Callback Function
 * @param {T} val Value to be passed to fn
 * @param {(err: any, v: K) => any} fn Node-like Callback Function to be turned into an AsyncIterable 
 */
export function callback<T, K>(val: T, fn: (val: T, callback: (err: any, v: K) => any) => any): AsyncIterable<K> {
    return create(observer => {
        fn(val, (err, v) => {
            if (!!err) {
                observer.throw(err);
            } else {
                observer.next(v);
                observer.return();
            }
        });
    });
}

/**
 * Creates an AsyncIterable that yields increments every given milliseconds for the given times
 * @param {number} ms Interval 
 * @param {number} max Count
 */
export async function* interval(ms: number, max: number): AsyncIterable<number> {
    for (let i = 0; i < max; i++) {
        yield i;
        await sleep(ms);
    }
}

/**
 * Creates an async iterable that emits the given arguments and awaits them in case they're promises.
 */
export async function* of<T>(...values: (T|Promise<T>)[]): AsyncIterable<T> {
    for (const v of values) {
        yield (v instanceof Promise) ? await v : v;
    }
}

/**
 * Creates an async iterable that acts like a for-loop.
 * @param {number} from Startnumber
 * @param {number} to Endnumber
 * @param {number} step Stepsize
 */
export async function* range(from: number, to: number, step: number = 1): AsyncIterable<number> {
    for (let i = from; i <= to; i += step) {
        yield i;
    }
}

/**
 * Creates an async iterable that generates the fibonacci sequence.
 * @param {number|undefined} n Number of iterations, if supposed to end.
 */
export async function* fibonacci(n?: number): AsyncIterable<number> {
    let a = 1, b = 1;
    yield 1;
    yield 1;
    while(!n || b < n) {
        [a, b] = [b, a + b];
        yield b;
    }
}

/**
 * Creates an async iterable that generates random numbers between
 * min (inclusive) and max (exclusive).
 * If count is not provided, it will endlessly generate numbers, otherwise stop at count.
 * @param {number} min Minimum value, inclusive. 0 by default. 
 * @param {number} max Maximum value, exclusive. 1 by default.
 * @param {number|undefined} count The amount of random numbers to yield, if not provided, infinite.
 */
export async function* random(min = 0, max = 1, count: number = Infinity): AsyncIterable<number> {
    for (let i = 0; i < count; i++) {
        yield min + Math.random() * (max - min);
    }
}

/**
 * Creates an async iterable from a callback using a BufferedObserver.
 * @param {Emitter<T>} creator Callback to create the iterable.
 */
export function create<T>(emitter: Emitter<T>): AsyncIterable<T> {
    return {
        [Symbol.asyncIterator]() {
            let observer = new BufferedObserver<T>();   
            emitter(observer);    
            return { next: () => observer.wait() };
        }
    };
}