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
    const Generators = require("./generators");
    exports.Generators = Generators;
    const Filters = require("./filters");
    exports.Filters = Filters;
    const Aggregators = require("./aggregators");
    exports.Aggregators = Aggregators;
    const Transformators = require("./transformators");
    exports.Transformators = Transformators;
    const Utilities = require("./utilities");
    exports.Utilities = Utilities;
    const Operators = Object.assign({}, Filters, Aggregators, Transformators, Utilities);
    exports.Operators = Operators;
});
//# sourceMappingURL=index.js.map