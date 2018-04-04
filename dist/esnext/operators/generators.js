import { BufferedObserver } from "../observer";
const sleep = (ms) => new Promise(res => setTimeout(res, ms));
export async function* interval(onUnsubscribe, ms, max) {
    let cancelled = false;
    onUnsubscribe(() => cancelled = true);
    for (let i = 0; i < max && !cancelled; i++) {
        yield i;
        await sleep(ms);
    }
}
export async function* of(onUnsubscribe, ...values) {
    let cancelled = false;
    onUnsubscribe(() => cancelled = true);
    for (const v of values) {
        if (cancelled)
            break;
        yield (v instanceof Promise) ? await v : v;
    }
}
export async function* range(onUnsubscribe, from, to, step = 1) {
    let cancelled = false;
    onUnsubscribe(() => cancelled = true);
    for (let i = from; i <= to && !cancelled; i += step) {
        yield i;
    }
}
export async function* fibonacci(onUnsubscribe, n) {
    let cancelled = false;
    onUnsubscribe(() => cancelled = true);
    let a = 1, b = 1;
    yield 1;
    yield 1;
    while ((!n || b < n) && !cancelled) {
        [a, b] = [b, a + b];
        yield b;
    }
}
export async function* random(onUnsubscribe, min = 0, max = 1, count = Infinity) {
    let cancelled = false;
    onUnsubscribe(() => cancelled = true);
    for (let i = 0; i < count && !cancelled; i++) {
        yield min + Math.random() * (max - min);
    }
}
export function create(onUnsubscribe, emitter) {
    return {
        [Symbol.asyncIterator]() {
            let observer = new BufferedObserver();
            emitter(observer, onUnsubscribe);
            return { next: () => observer.wait() };
        }
    };
}
//# sourceMappingURL=generators.js.map