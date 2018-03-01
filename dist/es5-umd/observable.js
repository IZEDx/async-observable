var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    var observer_1 = require("./observer");
    var _1 = require("./operators/");
    var Observable = (function () {
        function Observable(ai) {
            Object.assign(this, ai);
        }
        Observable.of = function () {
            var values = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                values[_i] = arguments[_i];
            }
            return new Observable(_1.Generators.of.apply(_1.Generators, values));
        };
        Observable.create = function (creator) {
            return new Observable(_1.Generators.create(creator));
        };
        Observable.interval = function (ms) {
            return new Observable(_1.Generators.create(function (observer) {
                var i = 0;
                setInterval(function () {
                    observer.next(i);
                    i += 1;
                }, ms);
            }));
        };
        Observable.range = function (from, to, step) {
            if (step === void 0) { step = 1; }
            return new Observable(_1.Generators.range(from, to, step));
        };
        Observable.listen = function (stream) {
            return new Observable(_1.Generators.create(function (observer) {
                stream.on("error", function (err) { return observer.throw(err); });
                stream.on("close", function (hadError) { return observer.return(); });
                stream.on("data", function (data) { return observer.next(data); });
            }));
        };
        Observable.prototype.checkValid = function () {
            return this.filter(function (v) { return v !== undefined && v !== null; });
        };
        Observable.prototype.do = function (fn) {
            return this.forEach(fn);
        };
        Observable.prototype.forEach = function (fn) {
            return new Observable(_1.Operators.forEach(this, fn));
        };
        Observable.prototype.filter = function (fn) {
            return new Observable(_1.Operators.filter(this, fn));
        };
        Observable.prototype.map = function (fn) {
            return new Observable(_1.Operators.map(this, fn));
        };
        Observable.prototype.flatMap = function (fn) {
            return new Observable(_1.Operators.flatMap(this, fn));
        };
        Observable.prototype.subscribe = function (subscriber) {
            return __awaiter(this, void 0, void 0, function () {
                var observer, _a, _b, data, r_1, e_1_1, e_2, r_2, r, e_1, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            observer = subscriber instanceof observer_1.AsyncObserver
                                ? subscriber
                                : new observer_1.AsyncObserver(subscriber);
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 16, , 19]);
                            _d.label = 2;
                        case 2:
                            _d.trys.push([2, 9, 10, 15]);
                            _a = __asyncValues(this);
                            _d.label = 3;
                        case 3: return [4, _a.next()];
                        case 4:
                            if (!(_b = _d.sent(), !_b.done)) return [3, 8];
                            return [4, _b.value];
                        case 5:
                            data = _d.sent();
                            r_1 = observer.next(data);
                            if (!(r_1 instanceof Promise)) return [3, 7];
                            return [4, r_1];
                        case 6:
                            _d.sent();
                            _d.label = 7;
                        case 7: return [3, 3];
                        case 8: return [3, 15];
                        case 9:
                            e_1_1 = _d.sent();
                            e_1 = { error: e_1_1 };
                            return [3, 15];
                        case 10:
                            _d.trys.push([10, , 13, 14]);
                            if (!(_b && !_b.done && (_c = _a.return))) return [3, 12];
                            return [4, _c.call(_a)];
                        case 11:
                            _d.sent();
                            _d.label = 12;
                        case 12: return [3, 14];
                        case 13:
                            if (e_1) throw e_1.error;
                            return [7];
                        case 14: return [7];
                        case 15: return [3, 19];
                        case 16:
                            e_2 = _d.sent();
                            r_2 = observer.throw(e_2);
                            if (!(r_2 instanceof Promise)) return [3, 18];
                            return [4, r_2];
                        case 17:
                            _d.sent();
                            _d.label = 18;
                        case 18: return [3, 19];
                        case 19:
                            r = observer.return();
                            if (!(r instanceof Promise)) return [3, 21];
                            return [4, r];
                        case 20:
                            _d.sent();
                            _d.label = 21;
                        case 21: return [2];
                    }
                });
            });
        };
        return Observable;
    }());
    exports.Observable = Observable;
});
//# sourceMappingURL=observable.js.map