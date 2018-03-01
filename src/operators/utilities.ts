
/**
 * Runs and awaits the given async function and then passes the values along.
 * @param {AsyncIterable<T>} input Input
 * @param {(value: T) => Promise<void>} fn Function
 * @return {AsyncIterable<T>} Output
 */
export async function* forEach<T>(input: AsyncIterable<T>, fn: (value: T) => Promise<void>|void): AsyncIterable<T> {
    for await(const data of input) {
        const run = fn(data);
        if (run instanceof Promise) {
            await fn(data);
        } else {
            fn(data);
        }
        yield data;
    }
}
