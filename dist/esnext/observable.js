import { AsyncObserver } from "./observer";
import { Generators as AsyncGenerators, Operators as AsyncOperators } from "./operators/";
export class Observable {
    constructor(ai) {
        Object.assign(this, ai);
    }
    static of(...values) {
        return new Observable(AsyncGenerators.of(...values));
    }
    static create(creator) {
        return new Observable(AsyncGenerators.create(creator));
    }
    static interval(ms) {
        return new Observable(AsyncGenerators.create(observer => {
            let i = 0;
            setInterval(() => {
                observer.next(i);
                i += 1;
            }, ms);
        }));
    }
    static range(from, to, step = 1) {
        return new Observable(AsyncGenerators.range(from, to, step));
    }
    static listen(stream) {
        return new Observable(AsyncGenerators.create(observer => {
            stream.on("error", err => observer.throw(err));
            stream.on("close", hadError => observer.return());
            stream.on("data", data => observer.next(data));
        }));
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
    filter(fn) {
        return new Observable(AsyncOperators.filter(this, fn));
    }
    map(fn) {
        return new Observable(AsyncOperators.map(this, fn));
    }
    flatMap(fn) {
        return new Observable(AsyncOperators.flatMap(this, fn));
    }
    async subscribe(subscriber) {
        let observer = subscriber instanceof AsyncObserver
            ? subscriber
            : new AsyncObserver(subscriber);
        try {
            for await (const data of this) {
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
    }
}
//# sourceMappingURL=observable.js.map