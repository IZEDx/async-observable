"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observer_1 = require("./observer");
const sleep = (ms) => new Promise(res => setTimeout(res, ms));
function callback(val, fn) {
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
exports.callback = callback;
async function* interval(ms, max) {
    for (let i = 0; i < max; i++) {
        yield i;
        await sleep(ms);
    }
}
exports.interval = interval;
async function* of(...values) {
    for (const v of values) {
        yield (v instanceof Promise) ? await v : v;
    }
}
exports.of = of;
async function* range(from, to, step = 1) {
    for (let i = from; i < to; i += step) {
        yield i;
    }
}
exports.range = range;
function create(creator) {
    return {
        [Symbol.asyncIterator]() {
            let waitingNext = null;
            let waitingError;
            const resultQueue = [];
            let thrownError;
            creator(new observer_1.AsyncObserver({
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
exports.create = create;
//# sourceMappingURL=generators.js.map