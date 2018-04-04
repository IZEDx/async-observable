
import { Emitter, BufferedObserver } from "../observer";

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

/**
 * An AsyncGenerator is a function that creates an AsyncIterable
 */
export type AsyncGenerator<T> = (onUnsubscribe: (callback: Function) => void, ...args: any[]) => AsyncIterable<T>;


/**
 * Creates an AsyncIterable that yields increments every given milliseconds for the given times
 * @param {number} ms Interval 
 * @param {number} max Count
 */
export async function* interval(onUnsubscribe: (callback: Function) => void, ms: number, max: number): AsyncIterable<number> {
    let cancelled = false;
    onUnsubscribe(() => cancelled = true);
    for (let i = 0; i < max && !cancelled; i++) {
        yield i;
        await sleep(ms);
    }
}

/**
 * Creates an async iterable that emits the given arguments and awaits them in case they're promises.
 */
export async function* of<T>(onUnsubscribe: (callback: Function) => void, ...values: (T|Promise<T>)[]): AsyncIterable<T> {
    let cancelled = false;
    onUnsubscribe(() => cancelled = true);
    for (const v of values) {
        if (cancelled) break;
        yield (v instanceof Promise) ? await v : v;
    }
}

/**
 * Creates an async iterable that acts like a for-loop.
 * @param {number} from Startnumber
 * @param {number} to Endnumber
 * @param {number} step Stepsize
 */
export async function* range(onUnsubscribe: (callback: Function) => void, from: number, to: number, step: number = 1): AsyncIterable<number> {
    let cancelled = false;
    onUnsubscribe(() => cancelled = true);
    for (let i = from; i <= to && !cancelled; i += step) {
        yield i;
    }
}

/**
 * Creates an async iterable that generates the fibonacci sequence.
 * @param {number|undefined} n Number of iterations, if supposed to end.
 */
export async function* fibonacci(onUnsubscribe: (callback: Function) => void, n?: number): AsyncIterable<number> {
    let cancelled = false;
    onUnsubscribe(() => cancelled = true);
    let a = 1, b = 1;
    yield 1;
    yield 1;
    while((!n || b < n) && !cancelled) {
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
export async function* random(onUnsubscribe: (callback: Function) => void, min = 0, max = 1, count: number = Infinity): AsyncIterable<number> {
    let cancelled = false;
    onUnsubscribe(() => cancelled = true);
    for (let i = 0; i < count && !cancelled; i++) {
        yield min + Math.random() * (max - min);
    }
}

/**
 * Creates an async iterable from a callback using a BufferedObserver.
 * @param {Emitter<T>} creator Callback to create the iterable.
 */
export function create<T>(onUnsubscribe: (callback: Function) => void, emitter: Emitter<T>): AsyncIterable<T> {
    return {
        [Symbol.asyncIterator]() {
            let observer = new BufferedObserver<T>();   
            emitter(observer, onUnsubscribe);    
            return { next: () => observer.wait() };
        }
    };
}