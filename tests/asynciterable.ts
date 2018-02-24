
import { expect } from "chai";
import { polyfillAsyncIterator, IAsyncIterable } from "../src/asynciterable";
import { sleep, when, time } from "./utils";

polyfillAsyncIterator();

async function* interval(ms: number, max: number): IAsyncIterable<number> {
    for (let i = 0; i < max; i++) {
        yield i;
        await sleep(ms);
    }
}


describe("IAsyncIterable", () => {
    it("is iterable and async", when(async () => {
        const started = time(250);
        let c = 0;

        for await(const i of interval(250, 4)) {
            expect(time(250) - started).to.equal(i);
            c++;
        }

        expect(c).to.equal(4);

    }));
});
