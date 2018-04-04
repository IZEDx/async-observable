
function polyfillSymbol(name: string) {
    (<any>Symbol)[name] = Symbol[name] !== undefined ? Symbol[name] : Symbol.for(name);
}

export function polyfillAsyncIterator() {
    polyfillSymbol("asyncIterator");
}

polyfillAsyncIterator();

export type MaybePromise<T> = Promise<T>|T;
export type Optional<T> = { 
    [P in keyof T]?: T[P] 
}

/**
 * Adds the passed function to the JavaScript Message Queue to be executed by the Event Loop, 
 * wraps a Promise around that and resolves any asynchronous values.
 * This allows to call a function asynchronously and on the Event Loop, which doesn't grow the call stack, 
 * but can be used in a synchronous manner using await.
 * @param fn The function to be executed, can be async.
 * @param args The arguments to be passed to this function.
 */
export async function immediate<T, K>(fn: (...args: K[]) => T|Promise<T>, ...args: K[]) {
    return new Promise<T>(res => {
        setImmediate(() => {
            const t = fn(...args);
            if (t instanceof Promise) {
                t.then(res);
            } else {
                res(t);
            }
        });
    });
}

export * from "./observable";
export * from "./observer";
export * from "./operators/";
