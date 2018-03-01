var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    return __asyncGenerator(this, arguments, function count_1() {
        var c, _a, _b, _1, e_1_1, e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    c = 0;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 7, 8, 13]);
                    _a = __asyncValues(!!predicate ? Filters.filter(input, predicate) : input);
                    _d.label = 2;
                case 2: return [4, __await(_a.next())];
                case 3:
                    if (!(_b = _d.sent(), !_b.done)) return [3, 6];
                    return [4, __await(_b.value)];
                case 4:
                    _1 = _d.sent();
                    c++;
                    _d.label = 5;
                case 5: return [3, 2];
                case 6: return [3, 13];
                case 7:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 13];
                case 8:
                    _d.trys.push([8, , 11, 12]);
                    if (!(_b && !_b.done && (_c = _a.return))) return [3, 10];
                    return [4, __await(_c.call(_a))];
                case 9:
                    _d.sent();
                    _d.label = 10;
                case 10: return [3, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7];
                case 12: return [7];
                case 13: return [4, c];
                case 14:
                    _d.sent();
                    return [2];
            }
        });
    });
}
export function max(input, comparer) {
    return __asyncGenerator(this, arguments, function max_1() {
        var max, input_1, input_1_1, val, e_2_1, e_2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!comparer) {
                        comparer = function (a, b) {
                            if (typeof a !== "number" || typeof b !== "number") {
                                throw TypeError("Input must be number when no comparer is given.");
                            }
                            return a > b ? 1 : -1;
                        };
                    }
                    max = null;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, 8, 13]);
                    input_1 = __asyncValues(input);
                    _b.label = 2;
                case 2: return [4, __await(input_1.next())];
                case 3:
                    if (!(input_1_1 = _b.sent(), !input_1_1.done)) return [3, 6];
                    return [4, __await(input_1_1.value)];
                case 4:
                    val = _b.sent();
                    if (max === null) {
                        max = val;
                    }
                    else {
                        max = comparer(val, max) > 0 ? val : max;
                    }
                    _b.label = 5;
                case 5: return [3, 2];
                case 6: return [3, 13];
                case 7:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 13];
                case 8:
                    _b.trys.push([8, , 11, 12]);
                    if (!(input_1_1 && !input_1_1.done && (_a = input_1.return))) return [3, 10];
                    return [4, __await(_a.call(input_1))];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10: return [3, 12];
                case 11:
                    if (e_2) throw e_2.error;
                    return [7];
                case 12: return [7];
                case 13:
                    if (!(max !== null)) return [3, 15];
                    return [4, max];
                case 14:
                    _b.sent();
                    _b.label = 15;
                case 15: return [2];
            }
        });
    });
}
export function min(input, comparer) {
    return __asyncGenerator(this, arguments, function min_1() {
        var origcomp_1;
        return __generator(this, function (_a) {
            if (!comparer) {
                comparer = function (a, b) {
                    if (typeof a !== "number" || typeof b !== "number") {
                        throw TypeError("Input must be number when no comparer is given.");
                    }
                    return a < b ? 1 : -1;
                };
            }
            else {
                origcomp_1 = comparer;
                comparer = function (a, b) {
                    return origcomp_1(a, b) < 0 ? 1 : -1;
                };
            }
            return [2, max(input, comparer)];
        });
    });
}
export function reduce(input, fn, seed) {
    return __asyncGenerator(this, arguments, function reduce_1() {
        var acc, input_2, input_2_1, curr, e_3_1, e_3, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    acc = seed;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, 9, 14]);
                    input_2 = __asyncValues(input);
                    _b.label = 2;
                case 2: return [4, __await(input_2.next())];
                case 3:
                    if (!(input_2_1 = _b.sent(), !input_2_1.done)) return [3, 7];
                    return [4, __await(input_2_1.value)];
                case 4:
                    curr = _b.sent();
                    return [4, acc = fn(acc, curr)];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6: return [3, 2];
                case 7: return [3, 14];
                case 8:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3, 14];
                case 9:
                    _b.trys.push([9, , 12, 13]);
                    if (!(input_2_1 && !input_2_1.done && (_a = input_2.return))) return [3, 11];
                    return [4, __await(_a.call(input_2))];
                case 10:
                    _b.sent();
                    _b.label = 11;
                case 11: return [3, 13];
                case 12:
                    if (e_3) throw e_3.error;
                    return [7];
                case 13: return [7];
                case 14: return [2];
            }
        });
    });
}
//# sourceMappingURL=aggregators.js.map