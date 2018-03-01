
/**
 * An AsyncOperator is a function that takes an AsyncIterable and returns an AsyncIterable.
 */
export type AsyncOperator<T, K = T> = (input: AsyncIterable<T>, ...args: any[]) => AsyncIterable<K>;

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
 * Splits all incoming values at the given seperator.
 * @param {AsyncIterable<string>} input Input
 * @param {string} seperator Seperator to split at
 * @return {AsyncIterable<string>} Output
 */
export async function* split(input: AsyncIterable<string>, seperator: string): AsyncIterable<string> {
    for await(const data of input) {
        for (const part of data.split(seperator)) {
            yield part;
        }
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

// Mathematical and Aggregate Operators

export async function* count<T>(input: AsyncIterable<T>, predicate?: (value: T) => Promise<boolean>|boolean): AsyncIterable<number> {
    let c = 0;
    for await(const _ of !!predicate ? filter(input, predicate) : input) {
        c++;
    }
    yield c;
}

export async function* max<T = number>(input: AsyncIterable<T>, comparer?: (a: T, b: T) => number): AsyncIterable<T> {
    if (!comparer) {
        comparer = (a: T, b: T) => {
            if (typeof a !== "number" || typeof b !== "number") {
                throw TypeError("Input must be number when no comparer is given.");
            }
            return a > b ? 1 : -1;
        }
    }

    let max: T|null = null;
    for await(const val of input) {
        if (max === null) {
            max = val;
        } else {
            max = comparer(val, max) > 0 ? val : max;
        }
    }
    if (max !== null) {
        yield max;
    }
}

export async function* min<T = number>(input: AsyncIterable<T>, comparer?: (a: T, b: T) => number): AsyncIterable<T> {
    if (!comparer) {
        comparer = (a: T, b: T) => {
            if (typeof a !== "number" || typeof b !== "number") {
                throw TypeError("Input must be number when no comparer is given.");
            }
            return a < b ? 1 : -1;
        }
    } else {
        const origcomp = comparer;
        comparer = (a: T, b: T) => {
            return origcomp(a, b) < 0 ? 1 : -1;
        }
    }

    return max(input, comparer);
}

export async function* reduce<T, K = T>(input: AsyncIterable<T>, fn: (acc: K, curr: T) => K, seed: K): AsyncIterable<K> {
    let acc = seed;
    for await(const curr of input) {
        yield acc = fn(acc, curr);
    }
}