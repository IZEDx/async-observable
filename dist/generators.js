"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const asynciterable_1 = require("./asynciterable");
asynciterable_1.polyfillAsyncIterator();
const nop = () => { };
const sleep = (ms) => new Promise(res => setTimeout(res, ms));
function callback(val, fn) {
    return create(observer => {
        fn(val, (err, v) => {
            if (!!err) {
                (observer.error || nop)(err);
            }
            else {
                observer.next(v);
            }
            (observer.complete || nop)();
        });
    });
}
exports.callback = callback;
function interval(ms) {
    return __asyncGenerator(this, arguments, function* interval_1() {
        let c = 0;
        while (true) {
            yield c++;
            yield __await(sleep(ms));
        }
    });
}
exports.interval = interval;
function of(...values) {
    return __asyncGenerator(this, arguments, function* of_1() {
        for (const v of values) {
            yield (v instanceof Promise) ? yield __await(v) : v;
        }
    });
}
exports.of = of;
function range(from, to, step = 1) {
    return __asyncGenerator(this, arguments, function* range_1() {
        for (let i = from; i < to; i += step) {
            yield i;
        }
    });
}
exports.range = range;
function create(creator) {
    return {
        [Symbol.asyncIterator]() {
            let waitingNext = null;
            let waitingError;
            const queue = [];
            creator({
                next(value) {
                    if (waitingNext === null) {
                        queue.push({ value, done: false });
                    }
                    else {
                        waitingNext({ value, done: false });
                        waitingNext = null;
                    }
                },
                complete() {
                    if (waitingNext === null) {
                        queue.push({ value: undefined, done: true });
                    }
                    else {
                        waitingNext({ value: undefined, done: true });
                        waitingNext = null;
                    }
                },
                error(err) {
                    if (waitingError !== undefined) {
                        waitingError(err);
                    }
                }
            });
            return {
                next() {
                    return new Promise((resolve, reject) => {
                        waitingError = reject;
                        if (queue.length === 0) {
                            return waitingNext = resolve;
                        }
                        resolve(queue[0]);
                        queue.splice(0, 1);
                    });
                }
            };
        }
    };
}
exports.create = create;
//# sourceMappingURL=generators.js.map