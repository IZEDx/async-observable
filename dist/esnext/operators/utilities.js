export async function* forEach(input, fn) {
    for await (const data of input) {
        const run = fn(data);
        if (run instanceof Promise) {
            await fn(data);
        }
        else {
            fn(data);
        }
        yield data;
    }
}
//# sourceMappingURL=utilities.js.map