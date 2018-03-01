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
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function map(input, fn) {
        return __asyncGenerator(this, arguments, function* map_1() {
            try {
                for (var input_1 = __asyncValues(input), input_1_1; input_1_1 = yield __await(input_1.next()), !input_1_1.done;) {
                    const data = yield __await(input_1_1.value);
                    const mapped = fn(data);
                    yield mapped instanceof Promise ? yield __await(mapped) : mapped;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (input_1_1 && !input_1_1.done && (_a = input_1.return)) yield __await(_a.call(input_1));
                }
                finally { if (e_1) throw e_1.error; }
            }
            var e_1, _a;
        });
    }
    exports.map = map;
    function split(input, seperator) {
        return __asyncGenerator(this, arguments, function* split_1() {
            try {
                for (var input_2 = __asyncValues(input), input_2_1; input_2_1 = yield __await(input_2.next()), !input_2_1.done;) {
                    const data = yield __await(input_2_1.value);
                    for (const part of data.split(seperator)) {
                        yield part;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (input_2_1 && !input_2_1.done && (_a = input_2.return)) yield __await(_a.call(input_2));
                }
                finally { if (e_2) throw e_2.error; }
            }
            var e_2, _a;
        });
    }
    exports.split = split;
    function buffer(input, seperator) {
        return __asyncGenerator(this, arguments, function* buffer_1() {
            let buff = "";
            try {
                for (var input_3 = __asyncValues(input), input_3_1; input_3_1 = yield __await(input_3.next()), !input_3_1.done;) {
                    const data = yield __await(input_3_1.value);
                    buff += data;
                    let idx = buff.indexOf(seperator);
                    while (idx >= 0) {
                        yield buff.substr(0, idx);
                        buff = buff.substr(idx + seperator.length);
                        idx = buff.indexOf(seperator);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (input_3_1 && !input_3_1.done && (_a = input_3.return)) yield __await(_a.call(input_3));
                }
                finally { if (e_3) throw e_3.error; }
            }
            var e_3, _a;
        });
    }
    exports.buffer = buffer;
    function filter(input, fn) {
        return __asyncGenerator(this, arguments, function* filter_1() {
            try {
                for (var input_4 = __asyncValues(input), input_4_1; input_4_1 = yield __await(input_4.next()), !input_4_1.done;) {
                    const data = yield __await(input_4_1.value);
                    const check = fn(data);
                    if (check instanceof Promise ? yield __await(check) : check) {
                        yield data;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (input_4_1 && !input_4_1.done && (_a = input_4.return)) yield __await(_a.call(input_4));
                }
                finally { if (e_4) throw e_4.error; }
            }
            var e_4, _a;
        });
    }
    exports.filter = filter;
    function forEach(input, fn) {
        return __asyncGenerator(this, arguments, function* forEach_1() {
            try {
                for (var input_5 = __asyncValues(input), input_5_1; input_5_1 = yield __await(input_5.next()), !input_5_1.done;) {
                    const data = yield __await(input_5_1.value);
                    const run = fn(data);
                    if (run instanceof Promise) {
                        yield __await(fn(data));
                    }
                    else {
                        fn(data);
                    }
                    yield data;
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (input_5_1 && !input_5_1.done && (_a = input_5.return)) yield __await(_a.call(input_5));
                }
                finally { if (e_5) throw e_5.error; }
            }
            var e_5, _a;
        });
    }
    exports.forEach = forEach;
    function flatMap(input, fn) {
        return __asyncGenerator(this, arguments, function* flatMap_1() {
            try {
                for (var input_6 = __asyncValues(input), input_6_1; input_6_1 = yield __await(input_6.next()), !input_6_1.done;) {
                    const data = yield __await(input_6_1.value);
                    yield __await(yield* __asyncDelegator(__asyncValues(fn(data))));
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (input_6_1 && !input_6_1.done && (_a = input_6.return)) yield __await(_a.call(input_6));
                }
                finally { if (e_6) throw e_6.error; }
            }
            var e_6, _a;
        });
    }
    exports.flatMap = flatMap;
    function count(input, predicate) {
        return __asyncGenerator(this, arguments, function* count_1() {
            let c = 0;
            try {
                for (var _a = __asyncValues(!!predicate ? filter(input, predicate) : input), _b; _b = yield __await(_a.next()), !_b.done;) {
                    const _ = yield __await(_b.value);
                    c++;
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) yield __await(_c.call(_a));
                }
                finally { if (e_7) throw e_7.error; }
            }
            yield c;
            var e_7, _c;
        });
    }
    exports.count = count;
    function max(input, comparer) {
        return __asyncGenerator(this, arguments, function* max_1() {
            if (!comparer) {
                comparer = (a, b) => {
                    if (typeof a !== "number" || typeof b !== "number") {
                        throw TypeError("Input must be number when no comparer is given.");
                    }
                    return a > b ? 1 : -1;
                };
            }
            let max = null;
            try {
                for (var input_7 = __asyncValues(input), input_7_1; input_7_1 = yield __await(input_7.next()), !input_7_1.done;) {
                    const val = yield __await(input_7_1.value);
                    if (max === null) {
                        max = val;
                    }
                    else {
                        max = comparer(val, max) > 0 ? val : max;
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (input_7_1 && !input_7_1.done && (_a = input_7.return)) yield __await(_a.call(input_7));
                }
                finally { if (e_8) throw e_8.error; }
            }
            if (max !== null) {
                yield max;
            }
            var e_8, _a;
        });
    }
    exports.max = max;
    function min(input, comparer) {
        return __asyncGenerator(this, arguments, function* min_1() {
            if (!comparer) {
                comparer = (a, b) => {
                    if (typeof a !== "number" || typeof b !== "number") {
                        throw TypeError("Input must be number when no comparer is given.");
                    }
                    return a < b ? 1 : -1;
                };
            }
            else {
                const origcomp = comparer;
                comparer = (a, b) => {
                    return origcomp(a, b) < 0 ? 1 : -1;
                };
            }
            return max(input, comparer);
        });
    }
    exports.min = min;
    function reduce(input, fn, seed) {
        return __asyncGenerator(this, arguments, function* reduce_1() {
            let acc = seed;
            try {
                for (var input_8 = __asyncValues(input), input_8_1; input_8_1 = yield __await(input_8.next()), !input_8_1.done;) {
                    const curr = yield __await(input_8_1.value);
                    yield acc = fn(acc, curr);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (input_8_1 && !input_8_1.done && (_a = input_8.return)) yield __await(_a.call(input_8));
                }
                finally { if (e_9) throw e_9.error; }
            }
            var e_9, _a;
        });
    }
    exports.reduce = reduce;
});
//# sourceMappingURL=operators.js.map