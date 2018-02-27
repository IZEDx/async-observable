"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
Object.defineProperty(exports, "__esModule", { value: true });
const observer_1 = require("./observer");
const AsyncGenerators = require("./generators");
const AsyncOperators = require("./operators");
class Observable {
    constructor(ai) {
        Object.assign(this, ai);
    }
    static of(...values) {
        return new Observable(AsyncGenerators.of(...values));
    }
    static create(creator) {
        return new Observable(AsyncGenerators.create(creator));
    }
    static interval(ms) {
        return new Observable(AsyncGenerators.create(observer => {
            let i = 0;
            setInterval(() => {
                observer.next(i);
                i += 1;
            }, ms);
        }));
    }
    static range(from, to, step = 1) {
        return new Observable(AsyncGenerators.range(from, to, step));
    }
    static listen(stream) {
        return new Observable(AsyncGenerators.create(observer => {
            stream.on("error", err => observer.throw(err));
            stream.on("close", hadError => observer.return());
            stream.on("data", data => observer.next(data));
        }));
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
    filter(fn) {
        return new Observable(AsyncOperators.filter(this, fn));
    }
    map(fn) {
        return new Observable(AsyncOperators.map(this, fn));
    }
    flatMap(fn) {
        return new Observable(AsyncOperators.flatMap(this, fn));
    }
    async subscribe(subscriber) {
        let observer = subscriber instanceof observer_1.AsyncObserver
            ? subscriber
            : new observer_1.AsyncObserver(subscriber);
        try {
            try {
                for (var _a = __asyncValues(this), _b; _b = await _a.next(), !_b.done;) {
                    const data = await _b.value;
                    const r = observer.next(data);
                    if (r instanceof Promise) {
                        await r;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) await _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        catch (e) {
            const r = observer.throw(e);
            if (r instanceof Promise) {
                await r;
            }
        }
        const r = observer.return();
        if (r instanceof Promise) {
            await r;
        }
        var e_1, _c;
    }
}
exports.Observable = Observable;
//# sourceMappingURL=observable.js.map