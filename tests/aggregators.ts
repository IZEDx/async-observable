
import * as test from "tape";
import { Generators, Aggregators } from "../src";
import { when } from "./utils";


test("count should count all elements", when(async assert => {
    const numbers = Generators.range(1,7);
    const countit = Aggregators.count(numbers);
    const itresult = await countit[Symbol.asyncIterator]().next();
    assert.equal(itresult.value, 7);
    assert.end();
}));

test("count should apply predicate", when(async assert => {
    const numbers = Generators.range(1,7);
    const countit = Aggregators.count(numbers, i => i % 2 === 1);
    const itresult = await countit[Symbol.asyncIterator]().next();
    assert.equal(itresult.value, 4);
    assert.end();
}));

