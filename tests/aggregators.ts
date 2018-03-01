
import { expect } from "chai";
import { Generators, Aggregators } from "../src";
import { when } from "./utils";

describe("Aggregate Operators", () => {

    describe("count", () => {

        it("should count all elements", when(async () => {
            const numbers = Generators.range(1,7);
            const countit = Aggregators.count(numbers);
            const itresult = await countit[Symbol.asyncIterator]().next();
            expect(itresult.value).to.equal(7);
        }));

        it("should apply predicate", when(async () => {
            const numbers = Generators.range(1,7);
            const countit = Aggregators.count(numbers, i => i % 2 === 1);
            const itresult = await countit[Symbol.asyncIterator]().next();
            expect(itresult.value).to.equal(4);
        }));

    });

});
