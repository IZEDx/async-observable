import { AsyncObserver } from "../observer";
const sleep = (ms) => new Promise(res => setTimeout(res, ms));
export function callback(val, fn) {
    return create(observer => {
        fn(val, (err, v) => {
            if (!!err) {
                observer.throw(err);
            }
            else {
                observer.next(v);
            }
            observer.return();
        });
    });
}
export async function* interval(ms, max) {
    for (let i = 0; i < max; i++) {
        yield i;
        await sleep(ms);
    }
}
export async function* of(...values) {
    for (const v of values) {
        yield (v instanceof Promise) ? await v : v;
    }
}
export async function* range(from, to, step = 1) {
    for (let i = from; i <= to; i += step) {
        yield i;
    }
}
export function create(creator) {
    return {
        [Symbol.asyncIterator]() {
            let waitingNext = null;
            let waitingError;
            const resultQueue = [];
            let thrownError;
            creator(new AsyncObserver({
                next(value) {
                    if (thrownError !== undefined)
                        return;
                    if (waitingNext === null) {
                        resultQueue.push({ value, done: false });
                    }
                    else {
                        waitingNext({ value, done: false });
                        waitingNext = null;
                    }
                },
                return() {
                    if (thrownError !== undefined)
                        return;
                    if (waitingNext === null) {
                        resultQueue.push({ value: undefined, done: true });
                    }
                    else {
                        waitingNext({ value: undefined, done: true });
                        waitingNext = null;
                    }
                },
                throw(err) {
                    if (waitingError === undefined) {
                        thrownError = err;
                    }
                    else {
                        waitingError(err);
                    }
                }
            }));
            return {
                next() {
                    return new Promise((resolve, reject) => {
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
//# sourceMappingURL=generators.js.map