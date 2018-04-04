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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../observer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const observer_1 = require("../observer");
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));
    function callback(val, fn) {
        return create(observer => {
            fn(val, (err, v) => {
                if (!!err) {
                    observer.throw(err);
                }
                else {
                    observer.next(v);
                    observer.return();
                }
            });
        });
    }
    exports.callback = callback;
    function interval(ms, max) {
        return __asyncGenerator(this, arguments, function* interval_1() {
            for (let i = 0; i < max; i++) {
                yield i;
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
            for (let i = from; i <= to; i += step) {
                yield i;
            }
        });
    }
    exports.range = range;
    function fibonacci(n) {
        return __asyncGenerator(this, arguments, function* fibonacci_1() {
            let a = 1, b = 1;
            yield 1;
            yield 1;
            while (!n || b < n) {
                [a, b] = [b, a + b];
                yield b;
            }
        });
    }
    exports.fibonacci = fibonacci;
    function random(min = 0, max = 1, count = Infinity) {
        return __asyncGenerator(this, arguments, function* random_1() {
            for (let i = 0; i < count; i++) {
                yield min + Math.random() * (max - min);
            }
        });
    }
    exports.random = random;
    function create(emitter) {
        return {
            [Symbol.asyncIterator]() {
                let observer = new observer_1.BufferedObserver();
                emitter(observer);
                return { next: () => observer.wait() };
            }
        };
    }
    exports.create = create;
});
//# sourceMappingURL=generators.js.map