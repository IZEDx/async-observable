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
    var AsyncObserver = (function () {
        function AsyncObserver(obs) {
            this.obs = obs;
        }
        AsyncObserver.prototype.next = function (value) {
            return this.obs.next(value);
        };
        AsyncObserver.prototype.return = function () {
            if (this.obs.return) {
                return this.obs.return();
            }
        };
        AsyncObserver.prototype.throw = function (error) {
            if (this.obs.throw) {
                return this.obs.throw(error);
            }
        };
        return AsyncObserver;
    }());
    exports.AsyncObserver = AsyncObserver;
});
//# sourceMappingURL=observer.js.map