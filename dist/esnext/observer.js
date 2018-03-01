export class AsyncObserver {
    constructor(obs) {
        this.obs = obs;
    }
    next(value) {
        return this.obs.next(value);
    }
    return() {
        if (this.obs.return) {
            return this.obs.return();
        }
    }
    throw(error) {
        if (this.obs.throw) {
            return this.obs.throw(error);
        }
    }
}
//# sourceMappingURL=observer.js.map