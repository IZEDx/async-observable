function polyfillSymbol(name) {
    Symbol[name] = Symbol[name] !== undefined ? Symbol[name] : Symbol.for(name);
}
export function polyfillAsyncIterator() {
    polyfillSymbol("asyncIterator");
}
polyfillAsyncIterator();
export async function immediate(fn, ...args) {
    return new Promise(res => {
        setImmediate(() => {
            const t = fn(...args);
            if (t instanceof Promise) {
                t.then(res);
            }
            else {
                res(t);
            }
        });
    });
}
export * from "./observable";
export * from "./observer";
export * from "./operators/";
//# sourceMappingURL=index.js.map