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
    __export(require("./observable"));
    __export(require("./observer"));
    __export(require("./operators/"));
});
//# sourceMappingURL=index.js.map