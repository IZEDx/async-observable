
/**
 * Filters incoming value using the given predicate.
 * @param {AsyncIterable<T>} input Input
 * @param {(value: T) => Promise<boolean>} fn Predicate
 * @return {AsyncIterable<T>} Output
 */
export async function* filter<T>(input: AsyncIterable<T>, fn: (value: T) => Promise<boolean>|boolean): AsyncIterable<T> {
    for await(const data of input) {
        const check = fn(data);
        if (check instanceof Promise ? await check : check) {
            yield data;
        }
    }
}