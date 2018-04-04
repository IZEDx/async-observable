var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    var ObserverError = (function (_super) {
        __extends(ObserverError, _super);
        function ObserverError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ObserverError;
    }(Error));
    exports.ObserverError = ObserverError;
    ;
    var Observer = (function () {
        function Observer(obs) {
            this.obs = obs;
        }
        Observer.prototype.next = function (value) {
            return this.obs.next(value);
        };
        Observer.prototype.return = function () {
            if (this.obs.return) {
                return this.obs.return();
            }
        };
        Observer.prototype.throw = function (error) {
            if (this.obs.throw) {
                return this.obs.throw(error);
            }
        };
        return Observer;
    }());
    exports.Observer = Observer;
    var BufferedObserver = (function (_super) {
        __extends(BufferedObserver, _super);
        function BufferedObserver() {
            var _this = _super.call(this, {
                next: function (value) {
                    if (!_this._started)
                        _this._started = true;
                    if (_this._done)
                        return;
                    if (_this._waitingNext.length === 0) {
                        _this._resultQueue.push({ value: value, done: false });
                    }
                    else {
                        _this._waitingNext.forEach(function (fn) { return fn({ value: value, done: false }); });
                        _this._waitingNext = [];
                        _this._waitingError = [];
                    }
                },
                return: function () {
                    if (!_this._started)
                        _this._started = true;
                    if (_this._done)
                        return;
                    _this._done = true;
                    if (_this._waitingNext.length === 0) {
                        _this._resultQueue.push({ done: true });
                    }
                    else {
                        _this._waitingNext.forEach(function (fn) { return fn({ done: true }); });
                    }
                },
                throw: function (err) {
                    if (!_this._started)
                        _this._started = true;
                    if (_this._done)
                        return;
                    _this._done = true;
                    _this._thrownError = err;
                    _this._waitingError.forEach(function (fn) { return fn(err); });
                }
            }) || this;
            _this._waitingNext = [];
            _this._waitingError = [];
            _this._resultQueue = [];
            _this._done = false;
            _this._started = false;
            return _this;
        }
        Object.defineProperty(BufferedObserver.prototype, "thrownError", {
            get: function () {
                return this._thrownError;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BufferedObserver.prototype, "done", {
            get: function () {
                return this._done;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BufferedObserver.prototype, "started", {
            get: function () {
                return this._started;
            },
            enumerable: true,
            configurable: true
        });
        BufferedObserver.prototype.wait = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (_this._resultQueue.length !== 0) {
                    resolve(_this._resultQueue[0]);
                    _this._resultQueue.splice(0, 1);
                }
                else if (!_this._done) {
                    _this._waitingNext.push(function (data) { return resolve(data); });
                    _this._waitingError.push(reject);
                }
                else if (_this._thrownError) {
                    reject(_this._thrownError);
                }
                else {
                    resolve({ done: true });
                }
            });
        };
        return BufferedObserver;
    }(Observer));
    exports.BufferedObserver = BufferedObserver;
});
//# sourceMappingURL=observer.js.map