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
export { AsyncObserver };
//# sourceMappingURL=observer.js.map