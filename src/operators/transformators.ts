
/**
 * Maps all incoming values using the given mapping function.
 * @param {AsyncIterable<T>} input Input
 * @param {(value: T) => Promise<K>} fn Mapping function
 * @return {AsyncIterable<K>} Output
 */
export async function* map<T, K>(input: AsyncIterable<T>, fn: (value: T) => Promise<K>|K): AsyncIterable<K> {
    for await(const data of input) {
        const mapped = fn(data);
        yield mapped instanceof Promise ? await mapped : mapped;
    }
}

/**
 * Creates an Observable of every incoming value using the given Function and then yields the values of that.
 * @param {AsyncIterable<T>} input Input
 * @param {(value: T) => Observable<K>} fn Function
 * @return {AsyncIterable<K>} Output
 */
export async function* flatMap<T, K, O extends AsyncIterable<K>>(input: AsyncIterable<T>, fn: (value: T) => O): AsyncIterable<K> {
    for await(const data of input) {
        yield* fn(data);
    }
}
