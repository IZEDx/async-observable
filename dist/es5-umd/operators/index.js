var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./generators", "./filters", "./aggregators", "./transformators", "./utilities"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Generators = require("./generators");
    exports.Generators = Generators;
    var Filters = require("./filters");
    exports.Filters = Filters;
    var Aggregators = require("./aggregators");
    exports.Aggregators = Aggregators;
    var Transformators = require("./transformators");
    exports.Transformators = Transformators;
    var Utilities = require("./utilities");
    exports.Utilities = Utilities;
    var Operators = __assign({}, Filters, Aggregators, Transformators, Utilities);
    exports.Operators = Operators;
});
//# sourceMappingURL=index.js.map