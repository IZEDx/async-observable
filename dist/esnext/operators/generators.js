import { BufferedObserver } from "../observer";
const sleep = (ms) => new Promise(res => setTimeout(res, ms));
export function callback(val, fn) {
    return create(observer => {
        fn(val, (err, v) => {
            if (!!err) {
                observer.throw(err);
            }
            else {
                observer.next(v);
                observer.return();
            }
        });
    });
}
export async function* interval(ms, max) {
    for (let i = 0; i < max; i++) {
        yield i;
        await sleep(ms);
    }
}
export async function* of(...values) {
    for (const v of values) {
        yield (v instanceof Promise) ? await v : v;
    }
}
export async function* range(from, to, step = 1) {
    for (let i = from; i <= to; i += step) {
        yield i;
    }
}
export async function* fibonacci(n) {
    let a = 1, b = 1;
    yield 1;
    yield 1;
    while (!n || b < n) {
        [a, b] = [b, a + b];
        yield b;
    }
}
export async function* random(min = 0, max = 1, count = Infinity) {
    for (let i = 0; i < count; i++) {
        yield min + Math.random() * (max - min);
    }
}
export function create(emitter) {
    return {
        [Symbol.asyncIterator]() {
            let observer = new BufferedObserver();
            emitter(observer);
            return { next: () => observer.wait() };
        }
    };
}
//# sourceMappingURL=generators.js.map