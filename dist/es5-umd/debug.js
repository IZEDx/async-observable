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
        define(["require", "exports", "."], factory);
    }
})(function (require, exports) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    var _1 = require(".");
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var it, c, it_1, it_1_1, i, e_1_1, e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    it = _1.Generators.create(function (observer) {
                        observer.next(0);
                        observer.next(1);
                        observer.next(2);
                        observer.return();
                    });
                    c = 0;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, 8, 13]);
                    it_1 = __asyncValues(it);
                    _b.label = 2;
                case 2: return [4, it_1.next()];
                case 3:
                    if (!(it_1_1 = _b.sent(), !it_1_1.done)) return [3, 6];
                    return [4, it_1_1.value];
                case 4:
                    i = _b.sent();
                    console.log(++c, i);
                    _b.label = 5;
                case 5: return [3, 2];
                case 6: return [3, 13];
                case 7:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 13];
                case 8:
                    _b.trys.push([8, , 11, 12]);
                    if (!(it_1_1 && !it_1_1.done && (_a = it_1.return))) return [3, 10];
                    return [4, _a.call(it_1)];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10: return [3, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7];
                case 12: return [7];
                case 13: return [2];
            }
        });
    }); })();
});
//# sourceMappingURL=debug.js.map