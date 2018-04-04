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
import { Observer } from "./observer";
import { Generators as AsyncGenerators, Operators as AsyncOperators } from "./operators/";
export class Observable {
    constructor(ai) {
        Object.assign(this, ai);
    }
    static callback(val, fn) {
        return new Observable(AsyncGenerators.callback(val, fn));
    }
    static interval(ms, max) {
        return new Observable(AsyncGenerators.interval(ms, max));
    }
    static of(...values) {
        return new Observable(AsyncGenerators.of(...values));
    }
    static range(from, to, step = 1) {
        return new Observable(AsyncGenerators.range(from, to, step));
    }
    static fibonacci(iterations) {
        return new Observable(AsyncGenerators.fibonacci(iterations));
    }
    static create(emitter) {
        return new Observable(AsyncGenerators.create(emitter));
    }
    static listen(stream) {
        return Observable.create(observer => {
            stream.on("error", err => observer.throw(err));
            stream.on("close", hadError => observer.return());
            stream.on("data", data => observer.next(data));
        });
    }
    count(predicate) {
        return new Observable(AsyncOperators.count(this, predicate));
    }
    max(comparer) {
        return new Observable(AsyncOperators.max(this, comparer));
    }
    min(comparer) {
        return new Observable(AsyncOperators.min(this, comparer));
    }
    reduce(fn, seed) {
        return new Observable(AsyncOperators.reduce(this, fn, seed));
    }
    where(fn) {
        return this.filter(fn);
    }
    filter(fn) {
        return new Observable(AsyncOperators.filter(this, fn));
    }
    map(fn) {
        return new Observable(AsyncOperators.map(this, fn));
    }
    flatMap(fn) {
        return new Observable(AsyncOperators.flatMap(this, fn));
    }
    checkValid() {
        return this.filter(v => v !== undefined && v !== null);
    }
    do(fn) {
        return this.forEach(fn);
    }
    forEach(fn) {
        return new Observable(AsyncOperators.forEach(this, fn));
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
        let cancelled = false;
        const observer = subscriber instanceof Observer
            ? subscriber
            : new Observer(subscriber);
        const promise = (() => __awaiter(this, void 0, void 0, function* () {
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
            cancel: () => cancelled = true,
            wait: promise
        };
    }
}
//# sourceMappingURL=observable.js.map