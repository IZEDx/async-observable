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
    function buffer(input, seperator) {
        return __asyncGenerator(this, arguments, function* buffer_1() {
            let buff = "";
            try {
                for (var input_2 = __asyncValues(input), input_2_1; input_2_1 = yield __await(input_2.next()), !input_2_1.done;) {
                    const data = yield __await(input_2_1.value);
                    buff += data;
                    let idx = buff.indexOf(seperator);
                    while (idx >= 0) {
                        yield buff.substr(0, idx);
                        buff = buff.substr(idx + seperator.length);
                        idx = buff.indexOf(seperator);
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
    exports.buffer = buffer;
    function flatMap(input, fn) {
        return __asyncGenerator(this, arguments, function* flatMap_1() {
            try {
                for (var input_3 = __asyncValues(input), input_3_1; input_3_1 = yield __await(input_3.next()), !input_3_1.done;) {
                    const data = yield __await(input_3_1.value);
                    yield __await(yield* __asyncDelegator(__asyncValues(fn(data))));
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
    exports.flatMap = flatMap;
});
//# sourceMappingURL=transformators.js.map