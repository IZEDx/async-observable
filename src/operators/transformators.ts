
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
 * Buffers and splits incoming data using the given seperator.
 * @param {AsyncIterable<string>} input Input
 * @param {string} seperator Seperator to split and buffer at
 * @return {AsyncIterable<string>} Output
 */
export async function* buffer(input: AsyncIterable<string>, seperator: string): AsyncIterable<string> {
    let buff = "";

    for await(const data of input) {
        buff += data;
        let idx = buff.indexOf(seperator);

        while (idx >= 0) {
            yield buff.substr(0, idx);
            buff = buff.substr(idx + seperator.length);
            idx = buff.indexOf(seperator);
        }
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
