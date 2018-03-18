var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
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
import { Filters } from "./";
export function count(input, predicate) {
    return __asyncGenerator(this, arguments, function* count_1() {
        let c = 0;
        try {
            for (var _a = __asyncValues(!!predicate ? Filters.filter(input, predicate) : input), _b; _b = yield __await(_a.next()), !_b.done;) {
                const _ = yield __await(_b.value);
                c++;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) yield __await(_c.call(_a));
            }
            finally { if (e_1) throw e_1.error; }
        }
        yield c;
        var e_1, _c;
    });
}
const numberComparer = (a, b) => a > b ? 1 : -1;
export function max(input, comparer) {
    return __asyncGenerator(this, arguments, function* max_1() {
        let comp = (comparer || numberComparer);
        let max = null;
        try {
            for (var input_1 = __asyncValues(input), input_1_1; input_1_1 = yield __await(input_1.next()), !input_1_1.done;) {
                const val = yield __await(input_1_1.value);
                if (max === null) {
                    max = val;
                }
                else {
                    max = comp(val, max) > 0 ? val : max;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (input_1_1 && !input_1_1.done && (_a = input_1.return)) yield __await(_a.call(input_1));
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (max !== null) {
            yield max;
        }
        var e_2, _a;
    });
}
export function min(input, comparer) {
    return __asyncGenerator(this, arguments, function* min_1() {
        let comp = comparer || numberComparer;
        return max(input, (a, b) => {
            return comp(a, b) < 0 ? 1 : -1;
        });
    });
}
export function reduce(input, fn, seed) {
    return __asyncGenerator(this, arguments, function* reduce_1() {
        let acc = seed;
        try {
            for (var input_2 = __asyncValues(input), input_2_1; input_2_1 = yield __await(input_2.next()), !input_2_1.done;) {
                const curr = yield __await(input_2_1.value);
                yield acc = fn(acc, curr);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (input_2_1 && !input_2_1.done && (_a = input_2.return)) yield __await(_a.call(input_2));
            }
            finally { if (e_3) throw e_3.error; }
        }
        var e_3, _a;
    });
}
//# sourceMappingURL=aggregators.js.map