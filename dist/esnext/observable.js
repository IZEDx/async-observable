import { Observer } from "./observer";
import { Generators as AsyncGenerators, Operators as AsyncOperators } from "./operators/";
export class Observable {
    constructor(ai, unsubscribe) {
        this.unsubscribe = unsubscribe;
        Object.assign(this, ai);
    }
    static interval(ms, max) {
        return Observable.unsubscribable(AsyncGenerators.interval, ms, max);
    }
    static of(...values) {
        return Observable.unsubscribable(AsyncGenerators.of, ...values);
    }
    static range(from, to, step = 1) {
        return Observable.unsubscribable(AsyncGenerators.range, from, to, step);
    }
    static fibonacci(iterations) {
        return Observable.unsubscribable(AsyncGenerators.fibonacci, iterations);
    }
    static random(min = 0, max = 1, count = Infinity) {
        return Observable.unsubscribable(AsyncGenerators.random, min, max, count);
    }
    static callback(val, fn) {
        return Observable.create(observer => {
            fn(val, (err, v) => {
                if (err) {
                    observer.throw(err);
                }
                else {
                    observer.next(v);
                    observer.return();
                }
            });
        });
    }
    static listen(stream) {
        return Observable.create(observer => {
            stream.on("error", err => observer.throw(err));
            stream.on("close", hadError => observer.return());
            stream.on("data", data => observer.next(data));
        });
    }
    static create(emitter) {
        return Observable.unsubscribable(AsyncGenerators.create, emitter);
    }
    static unsubscribable(generator, ...args) {
        let unsubscribe = () => { };
        return new Observable(generator(cb => unsubscribe = cb, ...args), () => unsubscribe());
    }
    count(predicate) {
        return new Observable(AsyncOperators.count(this, predicate), this.unsubscribe);
    }
    max(comparer) {
        return new Observable(AsyncOperators.max(this, comparer), this.unsubscribe);
    }
    min(comparer) {
        return new Observable(AsyncOperators.min(this, comparer), this.unsubscribe);
    }
    reduce(fn, seed) {
        return new Observable(AsyncOperators.reduce(this, fn, seed), this.unsubscribe);
    }
    where(fn) {
        return this.filter(fn);
    }
    filter(fn) {
        return new Observable(AsyncOperators.filter(this, fn), this.unsubscribe);
    }
    map(fn) {
        return new Observable(AsyncOperators.map(this, fn), this.unsubscribe);
    }
    flatMap(fn) {
        return new Observable(AsyncOperators.flatMap(this, fn), this.unsubscribe);
    }
    checkValid() {
        return this.filter(v => v !== undefined && v !== null);
    }
    do(fn) {
        return this.forEach(fn);
    }
    forEach(fn) {
        return new Observable(AsyncOperators.forEach(this, fn), this.unsubscribe);
    }
    async toArray() {
        const elements = [];
        for await (const el of this) {
            elements.push(el);
        }
        return elements;
    }
    assign(object, key) {
        return this.subscribe({
            next: val => {
                object[key] = val;
            }
        });
    }
    subscribe(subscriber) {
        let unsubscribed = false;
        const observer = subscriber instanceof Observer
            ? subscriber
            : new Observer(subscriber);
        const promise = (async () => {
            try {
                for await (const data of this) {
                    if (unsubscribed)
                        break;
                    const r = observer.next(data);
                    if (r instanceof Promise) {
                        await r;
                    }
                }
                const r = observer.return();
                if (r instanceof Promise) {
                    await r;
                }
            }
            catch (e) {
                const r = observer.throw(e);
                if (r instanceof Promise) {
                    await r;
                }
            }
        })();
        return {
            unsubscribe: () => {
                unsubscribed = true;
                this.unsubscribe();
            },
            wait: promise
        };
    }
}
//# sourceMappingURL=observable.js.map