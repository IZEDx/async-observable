export async function* map(input, fn) {
    for await (const data of input) {
        const mapped = fn(data);
        yield mapped instanceof Promise ? await mapped : mapped;
    }
}
export async function* flatMap(input, fn) {
    for await (const data of input) {
        yield* fn(data);
    }
}
//# sourceMappingURL=transformators.js.map