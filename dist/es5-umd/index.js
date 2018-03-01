(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./generators", "./operators", "./observable", "./observer"], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    var Generators = require("./generators");
    exports.Generators = Generators;
    var Operators = require("./operators");
    exports.Operators = Operators;
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
});
//# sourceMappingURL=index.js.map