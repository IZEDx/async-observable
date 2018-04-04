export class ObserverError extends Error {
}
;
export class Observer {
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
export class BufferedObserver extends Observer {
    constructor() {
        super({
            next: (value) => {
                if (!this._started)
                    this._started = true;
                if (this._done)
                    return;
                if (this._waitingNext.length === 0) {
                    this._resultQueue.push({ value, done: false });
                }
                else {
                    this._waitingNext.forEach(fn => fn({ value, done: false }));
                    this._waitingNext = [];
                    this._waitingError = [];
                }
            },
            return: () => {
                if (!this._started)
                    this._started = true;
                if (this._done)
                    return;
                this._done = true;
                if (this._waitingNext.length === 0) {
                    this._resultQueue.push({ done: true });
                }
                else {
                    this._waitingNext.forEach(fn => fn({ done: true }));
                }
            },
            throw: (err) => {
                if (!this._started)
                    this._started = true;
                if (this._done)
                    return;
                this._done = true;
                this._thrownError = err;
                this._waitingError.forEach(fn => fn(err));
            }
        });
        this._waitingNext = [];
        this._waitingError = [];
        this._resultQueue = [];
        this._done = false;
        this._started = false;
    }
    get thrownError() {
        return this._thrownError;
    }
    get done() {
        return this._done;
    }
    get started() {
        return this._started;
    }
    wait() {
        return new Promise((resolve, reject) => {
            if (this._resultQueue.length !== 0) {
                resolve(this._resultQueue[0]);
                this._resultQueue.splice(0, 1);
            }
            else if (!this._done) {
                this._waitingNext.push(data => resolve(data));
                this._waitingError.push(reject);
            }
            else if (this._thrownError) {
                reject(this._thrownError);
            }
            else {
                resolve({ done: true });
            }
        });
    }
}
//# sourceMappingURL=observer.js.map