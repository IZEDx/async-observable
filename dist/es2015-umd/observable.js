var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./observer", "./operators/"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const observer_1 = require("./observer");
    const _1 = require("./operators/");
    class Observable {
        constructor(ai) {
            Object.assign(this, ai);
        }
        static callback(val, fn) {
            return new Observable(_1.Generators.callback(val, fn));
        }
        static interval(ms, max) {
            return new Observable(_1.Generators.interval(ms, max));
        }
        static of(...values) {
            return new Observable(_1.Generators.of(...values));
        }
        static range(from, to, step = 1) {
            return new Observable(_1.Generators.range(from, to, step));
        }
        static fibonacci(iterations) {
            return new Observable(_1.Generators.fibonacci(iterations));
        }
        static create(creator) {
            return new Observable(_1.Generators.create(creator));
        }
        static listen(stream) {
            return Observable.create(observer => {
                stream.on("error", err => observer.throw(err));
                stream.on("close", hadError => observer.return());
                stream.on("data", data => observer.next(data));
            });
        }
        count(predicate) {
            return new Observable(_1.Operators.count(this, predicate));
        }
        max(comparer) {
            return new Observable(_1.Operators.max(this, comparer));
        }
        min(comparer) {
            return new Observable(_1.Operators.min(this, comparer));
        }
        reduce(fn, seed) {
            return new Observable(_1.Operators.reduce(this, fn, seed));
        }
        filter(fn) {
            return new Observable(_1.Operators.filter(this, fn));
        }
        map(fn) {
            return new Observable(_1.Operators.map(this, fn));
        }
        flatMap(fn) {
            return new Observable(_1.Operators.flatMap(this, fn));
        }
        checkValid() {
            return this.filter(v => v !== undefined && v !== null);
        }
        do(fn) {
            return this.forEach(fn);
        }
        forEach(fn) {
            return new Observable(_1.Operators.forEach(this, fn));
        }
        assign(object, key) {
            return this.subscribe({
                next: val => {
                    object[key] = val;
                }
            });
        }
        subscribe(subscriber) {
            let cancelled = false;
            const observer = subscriber instanceof observer_1.AsyncObserver
                ? subscriber
                : new observer_1.AsyncObserver(subscriber);
            const subscription = (() => __awaiter(this, void 0, void 0, function* () {
                try {
                    try {
                        for (var _a = __asyncValues(this), _b; _b = yield _a.next(), !_b.done;) {
                            const data = yield _b.value;
                            if (cancelled)
                                break;
                            const r = observer.next(data);
                            if (r instanceof Promise) {
                                yield r;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) yield _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                catch (e) {
                    const r = observer.throw(e);
                    if (r instanceof Promise) {
                        yield r;
                    }
                }
                const r = observer.return();
                if (r instanceof Promise) {
                    yield r;
                }
                var e_1, _c;
            }))();
            return {
                cancel: () => cancelled = true,
                wait: subscription
            };
        }
    }
    exports.Observable = Observable;
});
//# sourceMappingURL=observable.js.map