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
import { BufferedObserver } from "../observer";
const sleep = (ms) => new Promise(res => setTimeout(res, ms));
export function interval(onUnsubscribe, ms, max) {
    return __asyncGenerator(this, arguments, function* interval_1() {
        let cancelled = false;
        onUnsubscribe(() => cancelled = true);
        for (let i = 0; i < max && !cancelled; i++) {
            yield i;
            yield __await(sleep(ms));
        }
    });
}
export function of(onUnsubscribe, ...values) {
    return __asyncGenerator(this, arguments, function* of_1() {
        let cancelled = false;
        onUnsubscribe(() => cancelled = true);
        for (const v of values) {
            if (cancelled)
                break;
            yield (v instanceof Promise) ? yield __await(v) : v;
        }
    });
}
export function range(onUnsubscribe, from, to, step = 1) {
    return __asyncGenerator(this, arguments, function* range_1() {
        let cancelled = false;
        onUnsubscribe(() => cancelled = true);
        for (let i = from; i <= to && !cancelled; i += step) {
            yield i;
        }
    });
}
export function fibonacci(onUnsubscribe, n) {
    return __asyncGenerator(this, arguments, function* fibonacci_1() {
        let cancelled = false;
        onUnsubscribe(() => cancelled = true);
        let a = 1, b = 1;
        yield 1;
        yield 1;
        while ((!n || b < n) && !cancelled) {
            [a, b] = [b, a + b];
            yield b;
        }
    });
}
export function random(onUnsubscribe, min = 0, max = 1, count = Infinity) {
    return __asyncGenerator(this, arguments, function* random_1() {
        let cancelled = false;
        onUnsubscribe(() => cancelled = true);
        for (let i = 0; i < count && !cancelled; i++) {
            yield min + Math.random() * (max - min);
        }
    });
}
export function create(onUnsubscribe, emitter) {
    return {
        [Symbol.asyncIterator]() {
            let observer = new BufferedObserver();
            emitter(observer, onUnsubscribe);
            return { next: () => observer.wait() };
        }
    };
}
//# sourceMappingURL=generators.js.map