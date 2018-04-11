
/**
 * Adds the passed function to the JavaScript Message Queue to be executed by the Event Loop, 
 * wraps a Promise around that and resolves any asynchronous values.
 * This allows to call a function asynchronously and on the Event Loop, which doesn't grow the call stack, 
 * but can be used in a synchronous manner using await.
 * @param fn The function to be executed, can be async.
 * @param args The arguments to be passed to this function.
 */
export function immediate<T>(fn: () => T|Promise<T>) {
    return schedule(fn => setTimeout(fn, 0), fn);
}

export function animationFrame<T>(fn: () => T|Promise<T>) {
    return schedule(fn => requestAnimationFrame(time => fn(time)), fn);
}


export async function schedule<T>(scheduler: (fn: Function) => void, fn: () => T|Promise<T>) {
    return new Promise<T>((resolve, reject) => {
        scheduler(() => {
            try {
                const t = fn();
                if (t instanceof Promise) {
                    t.then(resolve).catch(reject);
                } else {
                    resolve(t);
                }
            } catch(err) {
                reject(err);
            }
        });
    });
}