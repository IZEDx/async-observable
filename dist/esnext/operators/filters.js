export async function* filter(input, fn) {
    for await (const data of input) {
        const check = fn(data);
        if (check instanceof Promise ? await check : check) {
            yield data;
        }
    }
}
//# sourceMappingURL=filters.js.map