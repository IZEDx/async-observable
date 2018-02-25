"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Observer {
    constructor(obs) {
        this.obs = obs;
    }
    next(value) {
        return this.obs.next(value);
    }
    complete() {
        if (this.obs.complete) {
            return this.obs.complete();
        }
    }
    error(error) {
        if (this.obs.error) {
            return this.obs.error(error);
        }
    }
}
exports.Observer = Observer;
//# sourceMappingURL=observer.js.map