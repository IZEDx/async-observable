"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function* map(input, fn) {
    for await (const data of input) {
        const mapped = fn(data);
        yield mapped instanceof Promise ? await mapped : mapped;
    }
}
exports.map = map;
async function* split(input, seperator) {
    for await (const data of input) {
        for (const part of data.split(seperator)) {
            yield part;
        }
    }
}
exports.split = split;
async function* buffer(input, seperator) {
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
exports.buffer = buffer;
async function* filter(input, fn) {
    for await (const data of input) {
        const check = fn(data);
        if (check instanceof Promise ? await check : check) {
            yield data;
        }
    }
}
exports.filter = filter;
async function* forEach(input, fn) {
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
exports.forEach = forEach;
async function* flatMap(input, fn) {
    for await (const data of input) {
        yield* fn(data);
    }
}
exports.flatMap = flatMap;
//# sourceMappingURL=operators.js.map