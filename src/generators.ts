
import { AsyncObserver, ObserverFunction } from "./observer";

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
            }
            observer.return();
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
    for (let i = from; i < to; i += step) {
        yield i;
    }
}


/**
 * Creates an async iterable from a callback using an Observer.
 * @param {(observer: Observer<T>) => void} creator Callback to create the iterable.
 */
export function create<T>(creator: ObserverFunction<T>): AsyncIterable<T> {
    return {
        [Symbol.asyncIterator]() {
            let waitingNext: null | ((data: IteratorResult<T>) => void) = null;
            let waitingError: (err: Error) => void;
            const resultQueue: IteratorResult<T>[] = [];
            let thrownError: Error|undefined;

            creator(new AsyncObserver({
                next(value: T) {
                    if (thrownError !== undefined) return;
                    if (waitingNext === null) {
                        resultQueue.push({value, done: false});
                    } else {
                        waitingNext({value, done: false});
                        waitingNext = null;
                    }
                },
                // Any hack because TypeScript doesn't like IteratorResults with undefined values.
                return() {
                    if (thrownError !== undefined) return;
                    if (waitingNext === null) {
                        resultQueue.push({value: undefined, done: true} as any);
                    } else {
                        waitingNext({value: undefined, done: true} as any);
                        waitingNext = null;
                    }
                },
                throw(err: Error) {
                    if (waitingError === undefined) {
                        thrownError = err;
                    } else {
                        waitingError(err);
                    }
                }
            }));

            return {
                next() {
                    return new Promise<IteratorResult<T>>((resolve, reject) => {
                        waitingError = reject;
                        if (resultQueue.length === 0) { 
                            if (thrownError !== undefined) {
                                reject(thrownError);
                                return;
                            }

                            waitingNext = resolve; 
                            return;
                        }

                        resolve(resultQueue[0]);
                        resultQueue.splice(0, 1);
                    });
                }
            };
        }
    };
}