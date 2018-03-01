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
    function filter(input, fn) {
        return __asyncGenerator(this, arguments, function filter_1() {
            var input_1, input_1_1, data, check, _a, e_1_1, e_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 10, 11, 16]);
                        input_1 = __asyncValues(input);
                        _c.label = 1;
                    case 1: return [4, __await(input_1.next())];
                    case 2:
                        if (!(input_1_1 = _c.sent(), !input_1_1.done)) return [3, 9];
                        return [4, __await(input_1_1.value)];
                    case 3:
                        data = _c.sent();
                        check = fn(data);
                        if (!(check instanceof Promise)) return [3, 5];
                        return [4, __await(check)];
                    case 4:
                        _a = _c.sent();
                        return [3, 6];
                    case 5:
                        _a = check;
                        _c.label = 6;
                    case 6:
                        if (!_a) return [3, 8];
                        return [4, data];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8: return [3, 1];
                    case 9: return [3, 16];
                    case 10:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3, 16];
                    case 11:
                        _c.trys.push([11, , 14, 15]);
                        if (!(input_1_1 && !input_1_1.done && (_b = input_1.return))) return [3, 13];
                        return [4, __await(_b.call(input_1))];
                    case 12:
                        _c.sent();
                        _c.label = 13;
                    case 13: return [3, 15];
                    case 14:
                        if (e_1) throw e_1.error;
                        return [7];
                    case 15: return [7];
                    case 16: return [2];
                }
            });
        });
    }
    exports.filter = filter;
});
//# sourceMappingURL=filters.js.map