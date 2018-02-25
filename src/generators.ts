
import { IAsyncIterable, polyfillAsyncIterator } from "./asynciterable";
import { Observer } from "./observer";

polyfillAsyncIterator();
const nop = () => {};
const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export function callback<T, K>(val: T, fn: (val: T, callback: (err: any, v: K) => any) => any): IAsyncIterable<K> {
    return create(observer => {
        fn(val, (err, v) => {
            if (!!err) {
                observer.error(err);
            } else {
                observer.next(v);
            }
            observer.complete();
        });
    });
}

export async function* interval(ms: number, max: number): IAsyncIterable<number> {
    for (let i = 0; i < max; i++) {
        yield i;
        await sleep(ms);
    }
}

/**
 * Creates an async iterable that emits the given arguments and awaits them in case they're promises.
 */
export async function* of<T>(...values: (T|Promise<T>)[]): IAsyncIterable<T> {
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
export async function* range(from: number, to: number, step: number = 1): IAsyncIterable<number> {
    for (let i = from; i < to; i += step) {
        yield i;
    }
}

/**
 * Creates an async iterable from a callback using an Observer.
 * @param {(observer: Observer<T>) => void} creator Callback to create the iterable.
 */
export function create<T>(creator: (observer: Observer<T>) => void): IAsyncIterable<T> {
    return {
        [Symbol.asyncIterator]() {
            let waitingNext: null | ((data: IteratorResult<T>) => void) = null;
            let waitingError: (err: Error) => void;
            const queue: IteratorResult<T>[] = [];
            let error: Error|undefined;

            creator(new Observer({
                next(value: T) {
                    if (error !== undefined) return;
                    if (waitingNext === null) {
                        queue.push({value, done: false});
                    } else {
                        waitingNext({value, done: false});
                        waitingNext = null;
                    }
                },
                // Any hack because TypeScript doesn't like IteratorResults with undefined values.
                complete() {
                    if (error !== undefined) return;
                    if (waitingNext === null) {
                        queue.push({value: undefined, done: true} as any);
                    } else {
                        waitingNext({value: undefined, done: true} as any);
                        waitingNext = null;
                    }
                },
                error(err: Error) {
                    if (waitingError === undefined) {
                        error = err;
                    } else {
                        waitingError(err);
                    }
                }
            }));

            return {
                next(): Promise<IteratorResult<T>> {
                    return new Promise<IteratorResult<T>>((resolve, reject) => {
                        waitingError = reject;
                        if (queue.length === 0) { 
                            if (error !== undefined) {
                                reject(error);
                                return;
                            }

                            waitingNext = resolve; 
                            return;
                        }

                        resolve(queue[0]);
                        queue.splice(0, 1);
                    });
                }
            };
        }
    };
}