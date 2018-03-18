import { AsyncObserver } from "./observer";
import { Generators as AsyncGenerators, Operators as AsyncOperators } from "./operators/";
export class Observable {
    constructor(ai) {
        Object.assign(this, ai);
    }
    static callback(val, fn) {
        return new Observable(AsyncGenerators.callback(val, fn));
    }
    static interval(ms, max) {
        return new Observable(AsyncGenerators.interval(ms, max));
    }
    static of(...values) {
        return new Observable(AsyncGenerators.of(...values));
    }
    static range(from, to, step = 1) {
        return new Observable(AsyncGenerators.range(from, to, step));
    }
    static fibonacci(iterations) {
        return new Observable(AsyncGenerators.fibonacci(iterations));
    }
    static create(creator) {
        return new Observable(AsyncGenerators.create(creator));
    }
    static listen(stream) {
        return Observable.create(observer => {
            stream.on("error", err => observer.throw(err));
            stream.on("close", hadError => observer.return());
            stream.on("data", data => observer.next(data));
        });
    }
    count(predicate) {
        return new Observable(AsyncOperators.count(this, predicate));
    }
    max(comparer) {
        return new Observable(AsyncOperators.max(this, comparer));
    }
    min(comparer) {
        return new Observable(AsyncOperators.min(this, comparer));
    }
    reduce(fn, seed) {
        return new Observable(AsyncOperators.reduce(this, fn, seed));
    }
    filter(fn) {
        return new Observable(AsyncOperators.filter(this, fn));
    }
    map(fn) {
        return new Observable(AsyncOperators.map(this, fn));
    }
    flatMap(fn) {
        return new Observable(AsyncOperators.flatMap(this, fn));
    }
    checkValid() {
        return this.filter(v => v !== undefined && v !== null);
    }
    do(fn) {
        return this.forEach(fn);
    }
    forEach(fn) {
        return new Observable(AsyncOperators.forEach(this, fn));
    }
    assign(object, key) {
        return this.subscribe({
            next: val => {
                object[key] = val;
            }
        });
    }
    subscribe(subscriber) {
        let cancelled = false;
        const observer = subscriber instanceof AsyncObserver
            ? subscriber
            : new AsyncObserver(subscriber);
        const subscription = (async () => {
            try {
                for await (const data of this) {
                    if (cancelled)
                        break;
                    const r = observer.next(data);
                    if (r instanceof Promise) {
                        await r;
                    }
                }
            }
            catch (e) {
                const r = observer.throw(e);
                if (r instanceof Promise) {
                    await r;
                }
            }
            const r = observer.return();
            if (r instanceof Promise) {
                await r;
            }
        })();
        return {
            cancel: () => cancelled = true,
            wait: subscription
        };
    }
}
//# sourceMappingURL=observable.js.map