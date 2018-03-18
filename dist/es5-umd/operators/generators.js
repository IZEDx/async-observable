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
    var observer_1 = require("../observer");
    var sleep = function (ms) { return new Promise(function (res) { return setTimeout(res, ms); }); };
    function callback(val, fn) {
        return create(function (observer) {
            fn(val, function (err, v) {
                if (!!err) {
                    observer.throw(err);
                }
                else {
                    observer.next(v);
                }
                observer.return();
            });
        });
    }
    exports.callback = callback;
    function interval(ms, max) {
        return __asyncGenerator(this, arguments, function interval_1() {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < max)) return [3, 5];
                        return [4, i];
                    case 2:
                        _a.sent();
                        return [4, __await(sleep(ms))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3, 1];
                    case 5: return [2];
                }
            });
        });
    }
    exports.interval = interval;
    function of() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return __asyncGenerator(this, arguments, function of_1() {
            var _i, values_1, v, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, values_1 = values;
                        _b.label = 1;
                    case 1:
                        if (!(_i < values_1.length)) return [3, 7];
                        v = values_1[_i];
                        if (!(v instanceof Promise)) return [3, 3];
                        return [4, __await(v)];
                    case 2:
                        _a = _b.sent();
                        return [3, 4];
                    case 3:
                        _a = v;
                        _b.label = 4;
                    case 4: return [4, _a];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        _i++;
                        return [3, 1];
                    case 7: return [2];
                }
            });
        });
    }
    exports.of = of;
    function range(from, to, step) {
        if (step === void 0) { step = 1; }
        return __asyncGenerator(this, arguments, function range_1() {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = from;
                        _a.label = 1;
                    case 1:
                        if (!(i <= to)) return [3, 4];
                        return [4, i];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i += step;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    }
    exports.range = range;
    function fibonacci(n) {
        return __asyncGenerator(this, arguments, function fibonacci_1() {
            var a, b, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        a = 1, b = 1;
                        return [4, 1];
                    case 1:
                        _b.sent();
                        return [4, 1];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!(!n || b < n)) return [3, 5];
                        _a = [b, a + b], a = _a[0], b = _a[1];
                        return [4, b];
                    case 4:
                        _b.sent();
                        return [3, 3];
                    case 5: return [2];
                }
            });
        });
    }
    exports.fibonacci = fibonacci;
    function random(min, max, count) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        if (count === void 0) { count = Infinity; }
        return __asyncGenerator(this, arguments, function random_1() {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < count)) return [3, 4];
                        return [4, min + Math.random() * (max - min)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    }
    exports.random = random;
    function create(creator) {
        return _a = {},
            _a[Symbol.asyncIterator] = function () {
                var waitingNext = null;
                var waitingError;
                var resultQueue = [];
                var thrownError;
                creator(new observer_1.AsyncObserver({
                    next: function (value) {
                        if (thrownError !== undefined)
                            return;
                        if (waitingNext === null) {
                            resultQueue.push({ value: value, done: false });
                        }
                        else {
                            waitingNext({ value: value, done: false });
                            waitingNext = null;
                        }
                    },
                    return: function () {
                        if (thrownError !== undefined)
                            return;
                        if (waitingNext === null) {
                            resultQueue.push({ value: undefined, done: true });
                        }
                        else {
                            waitingNext({ value: undefined, done: true });
                            waitingNext = null;
                        }
                    },
                    throw: function (err) {
                        if (waitingError === undefined) {
                            thrownError = err;
                        }
                        else {
                            waitingError(err);
                        }
                    }
                }));
                return {
                    next: function () {
                        return new Promise(function (resolve, reject) {
                            waitingError = reject;
                            if (resultQueue.length === 0) {
                                if (thrownError !== undefined) {
                                    reject(thrownError);
                                    return;
                                }
                                waitingNext = resolve;
                                return;
                            }
                            resolve(resultQueue[0]);
                            resultQueue.splice(0, 1);
                        });
                    }
                };
            },
            _a;
        var _a;
    }
    exports.create = create;
});
//# sourceMappingURL=generators.js.map