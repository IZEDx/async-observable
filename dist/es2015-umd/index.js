var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./observable", "./observer", "./operators/"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    function polyfillSymbol(name) {
        Symbol[name] = Symbol[name] !== undefined ? Symbol[name] : Symbol.for(name);
    }
    function polyfillAsyncIterator() {
        polyfillSymbol("asyncIterator");
    }
    exports.polyfillAsyncIterator = polyfillAsyncIterator;
    polyfillAsyncIterator();
    function immediate(fn, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(res => {
                setImmediate(() => {
                    const t = fn(...args);
                    if (t instanceof Promise) {
                        t.then(res);
                    }
                    else {
                        res(t);
                    }
                });
            });
        });
    }
    exports.immediate = immediate;
    __export(require("./observable"));
    __export(require("./observer"));
    __export(require("./operators/"));
});
//# sourceMappingURL=index.js.map