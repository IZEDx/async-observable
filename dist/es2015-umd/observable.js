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
        constructor(ai, unsubscribe) {
            this.unsubscribe = unsubscribe;
            Object.assign(this, ai);
        }
        static interval(ms, max) {
            return Observable.unsubscribable(_1.Generators.interval, ms, max);
        }
        static of(...values) {
            return Observable.unsubscribable(_1.Generators.of, ...values);
        }
        static range(from, to, step = 1) {
            return Observable.unsubscribable(_1.Generators.range, from, to, step);
        }
        static fibonacci(iterations) {
            return Observable.unsubscribable(_1.Generators.fibonacci, iterations);
        }
        static random(min = 0, max = 1, count = Infinity) {
            return Observable.unsubscribable(_1.Generators.random, min, max, count);
        }
        static callback(val, fn) {
            return Observable.create(observer => {
                fn(val, (err, v) => {
                    if (err) {
                        observer.throw(err);
                    }
                    else {
                        observer.next(v);
                        observer.return();
                    }
                });
            });
        }
        static listen(stream) {
            return Observable.create(observer => {
                stream.on("error", err => observer.throw(err));
                stream.on("close", hadError => observer.return());
                stream.on("data", data => observer.next(data));
            });
        }
        static create(emitter) {
            return Observable.unsubscribable(_1.Generators.create, emitter);
        }
        static unsubscribable(generator, ...args) {
            let unsubscribe = () => { };
            return new Observable(generator(cb => unsubscribe = cb, ...args), () => unsubscribe());
        }
        count(predicate) {
            return new Observable(_1.Operators.count(this, predicate), this.unsubscribe);
        }
        max(comparer) {
            return new Observable(_1.Operators.max(this, comparer), this.unsubscribe);
        }
        min(comparer) {
            return new Observable(_1.Operators.min(this, comparer), this.unsubscribe);
        }
        reduce(fn, seed) {
            return new Observable(_1.Operators.reduce(this, fn, seed), this.unsubscribe);
        }
        where(fn) {
            return this.filter(fn);
        }
        filter(fn) {
            return new Observable(_1.Operators.filter(this, fn), this.unsubscribe);
        }
        map(fn) {
            return new Observable(_1.Operators.map(this, fn), this.unsubscribe);
        }
        flatMap(fn) {
            return new Observable(_1.Operators.flatMap(this, fn), this.unsubscribe);
        }
        checkValid() {
            return this.filter(v => v !== undefined && v !== null);
        }
        do(fn) {
            return this.forEach(fn);
        }
        forEach(fn) {
            return new Observable(_1.Operators.forEach(this, fn), this.unsubscribe);
        }
        toArray() {
            return __awaiter(this, void 0, void 0, function* () {
                const elements = [];
                try {
                    for (var _a = __asyncValues(this), _b; _b = yield _a.next(), !_b.done;) {
                        const el = yield _b.value;
                        elements.push(el);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) yield _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return elements;
                var e_1, _c;
            });
        }
        assign(object, key) {
            return this.subscribe({
                next: val => {
                    object[key] = val;
                }
            });
        }
        subscribe(subscriber) {
            let unsubscribed = false;
            const observer = subscriber instanceof observer_1.Observer
                ? subscriber
                : new observer_1.Observer(subscriber);
            const promise = (() => __awaiter(this, void 0, void 0, function* () {
                try {
                    try {
                        for (var _a = __asyncValues(this), _b; _b = yield _a.next(), !_b.done;) {
                            const data = yield _b.value;
                            if (unsubscribed)
                                break;
                            const r = observer.next(data);
                            if (r instanceof Promise) {
                                yield r;
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) yield _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    const r = observer.return();
                    if (r instanceof Promise) {
                        yield r;
                    }
                }
                catch (e) {
                    const r = observer.throw(e);
                    if (r instanceof Promise) {
                        yield r;
                    }
                }
                var e_2, _c;
            }))();
            return {
                unsubscribe: () => {
                    unsubscribed = true;
                    this.unsubscribe();
                },
                wait: promise
            };
        }
    }
    exports.Observable = Observable;
});
//# sourceMappingURL=observable.js.map