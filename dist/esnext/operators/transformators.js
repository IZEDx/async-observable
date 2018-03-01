export async function* map(input, fn) {
    for await (const data of input) {
        const mapped = fn(data);
        yield mapped instanceof Promise ? await mapped : mapped;
    }
}
export async function* buffer(input, seperator) {
    let buff = "";
    for await (const data of input) {
        buff += data;
        let idx = buff.indexOf(seperator);
        while (idx >= 0) {
            yield buff.substr(0, idx);
            buff = buff.substr(idx + seperator.length);
            idx = buff.indexOf(seperator);
        }
    }
}
export async function* flatMap(input, fn) {
    for await (const data of input) {
        yield* fn(data);
    }
}
//# sourceMappingURL=transformators.js.map