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
import { Observer } from "./observer";
import { Generators as AsyncGenerators, Operators as AsyncOperators } from "./operators/";
var Observable = (function () {
    function Observable(ai, unsubscribe) {
        this.unsubscribe = unsubscribe;
        Object.assign(this, ai);
    }
    Observable.interval = function (ms, max) {
        return Observable.unsubscribable(AsyncGenerators.interval, ms, max);
    };
    Observable.of = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        return Observable.unsubscribable.apply(Observable, [AsyncGenerators.of].concat(values));
    };
    Observable.range = function (from, to, step) {
        if (step === void 0) { step = 1; }
        return Observable.unsubscribable(AsyncGenerators.range, from, to, step);
    };
    Observable.fibonacci = function (iterations) {
        return Observable.unsubscribable(AsyncGenerators.fibonacci, iterations);
    };
    Observable.random = function (min, max, count) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        if (count === void 0) { count = Infinity; }
        return Observable.unsubscribable(AsyncGenerators.random, min, max, count);
    };
    Observable.callback = function (val, fn) {
        return Observable.create(function (observer) {
            fn(val, function (err, v) {
                if (err) {
                    observer.throw(err);
                }
                else {
                    observer.next(v);
                    observer.return();
                }
            });
        });
    };
    Observable.listen = function (stream) {
        return Observable.create(function (observer) {
            stream.on("error", function (err) { return observer.throw(err); });
            stream.on("close", function (hadError) { return observer.return(); });
            stream.on("data", function (data) { return observer.next(data); });
        });
    };
    Observable.create = function (emitter) {
        return Observable.unsubscribable(AsyncGenerators.create, emitter);
    };
    Observable.unsubscribable = function (generator) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var unsubscribe = function () { };
        return new Observable(generator.apply(void 0, [function (cb) { return unsubscribe = cb; }].concat(args)), function () { return unsubscribe(); });
    };
    Observable.prototype.count = function (predicate) {
        return new Observable(AsyncOperators.count(this, predicate), this.unsubscribe);
    };
    Observable.prototype.max = function (comparer) {
        return new Observable(AsyncOperators.max(this, comparer), this.unsubscribe);
    };
    Observable.prototype.min = function (comparer) {
        return new Observable(AsyncOperators.min(this, comparer), this.unsubscribe);
    };
    Observable.prototype.reduce = function (fn, seed) {
        return new Observable(AsyncOperators.reduce(this, fn, seed), this.unsubscribe);
    };
    Observable.prototype.where = function (fn) {
        return this.filter(fn);
    };
    Observable.prototype.filter = function (fn) {
        return new Observable(AsyncOperators.filter(this, fn), this.unsubscribe);
    };
    Observable.prototype.map = function (fn) {
        return new Observable(AsyncOperators.map(this, fn), this.unsubscribe);
    };
    Observable.prototype.flatMap = function (fn) {
        return new Observable(AsyncOperators.flatMap(this, fn), this.unsubscribe);
    };
    Observable.prototype.checkValid = function () {
        return this.filter(function (v) { return v !== undefined && v !== null; });
    };
    Observable.prototype.do = function (fn) {
        return this.forEach(fn);
    };
    Observable.prototype.forEach = function (fn) {
        return new Observable(AsyncOperators.forEach(this, fn), this.unsubscribe);
    };
    Observable.prototype.toArray = function () {
        return __awaiter(this, void 0, void 0, function () {
            var elements, _a, _b, el, e_1_1, e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        elements = [];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 7, 8, 13]);
                        _a = __asyncValues(this);
                        _d.label = 2;
                    case 2: return [4, _a.next()];
                    case 3:
                        if (!(_b = _d.sent(), !_b.done)) return [3, 6];
                        return [4, _b.value];
                    case 4:
                        el = _d.sent();
                        elements.push(el);
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
                        return [4, _c.call(_a)];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10: return [3, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7];
                    case 12: return [7];
                    case 13: return [2, elements];
                }
            });
        });
    };
    Observable.prototype.assign = function (object, key) {
        return this.subscribe({
            next: function (val) {
                object[key] = val;
            }
        });
    };
    Observable.prototype.subscribe = function (subscriber) {
        var _this = this;
        var unsubscribed = false;
        var observer = subscriber instanceof Observer
            ? subscriber
            : new Observer(subscriber);
        var promise = (function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b, data, r_1, e_2_1, r, e_3, r, e_2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 17, , 20]);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 8, 9, 14]);
                        _a = __asyncValues(this);
                        _d.label = 2;
                    case 2: return [4, _a.next()];
                    case 3:
                        if (!(_b = _d.sent(), !_b.done)) return [3, 7];
                        return [4, _b.value];
                    case 4:
                        data = _d.sent();
                        if (unsubscribed)
                            return [3, 7];
                        r_1 = observer.next(data);
                        if (!(r_1 instanceof Promise)) return [3, 6];
                        return [4, r_1];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6: return [3, 2];
                    case 7: return [3, 14];
                    case 8:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3, 14];
                    case 9:
                        _d.trys.push([9, , 12, 13]);
                        if (!(_b && !_b.done && (_c = _a.return))) return [3, 11];
                        return [4, _c.call(_a)];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [3, 13];
                    case 12:
                        if (e_2) throw e_2.error;
                        return [7];
                    case 13: return [7];
                    case 14:
                        r = observer.return();
                        if (!(r instanceof Promise)) return [3, 16];
                        return [4, r];
                    case 15:
                        _d.sent();
                        _d.label = 16;
                    case 16: return [3, 20];
                    case 17:
                        e_3 = _d.sent();
                        r = observer.throw(e_3);
                        if (!(r instanceof Promise)) return [3, 19];
                        return [4, r];
                    case 18:
                        _d.sent();
                        _d.label = 19;
                    case 19: return [3, 20];
                    case 20: return [2];
                }
            });
        }); })();
        return {
            unsubscribe: function () {
                unsubscribed = true;
                _this.unsubscribe();
            },
            wait: promise
        };
    };
    return Observable;
}());
export { Observable };
//# sourceMappingURL=observable.js.map