
import { IAsyncIterable } from "./asynciterable";
import { IObserver } from "./observer";

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
 * @param {(observer: IObserver<T>) => void} creator Callback to create the iterable.
 */
export function create<T>(creator: (observer: IObserver<T>) => void): IAsyncIterable<T> {
    return {
        [Symbol.asyncIterator]() {
            let waitingNext: null | ((data: IteratorResult<T>) => void) = null;
            let waitingError: (err: Error) => void;
            const queue: IteratorResult<T>[] = [];

            creator({
                next(value: T) {
                    if (waitingNext === null) {
                        queue.push({value, done: false});
                    } else {
                        waitingNext({value, done: false});
                        waitingNext = null;
                    }
                },
                // Any hack because TypeScript doesn't like IteratorResults with undefined values.
                complete() {
                    if (waitingNext === null) {
                        queue.push({value: undefined, done: true} as any);
                    } else {
                        waitingNext({value: undefined, done: true} as any);
                        waitingNext = null;
                    }
                },
                error(err: Error) {
                    if (waitingError !== undefined) {
                        waitingError(err);
                    }
                }
            });

            return {
                next(): Promise<IteratorResult<T>> {
                    return new Promise<IteratorResult<T>>((resolve, reject) => {
                        waitingError = reject;
                        if (queue.length === 0) { return waitingNext = resolve; }

                        resolve(queue[0]);
                        queue.splice(0, 1);
                    });
                }
            };
        }
    };
}