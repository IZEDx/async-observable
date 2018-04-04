
import * as test from "tape";
import { Observable } from "../src";
import { when } from "./utils";


test("Count should count all elements.", when(async assert => {
    const countit = Observable.range(1,7).count();
    const itresult = await countit[Symbol.asyncIterator]().next();
    assert.equal(itresult.value, 7, "The counted result should equal 7.");
    assert.end();
}));

test("Count should apply predicate.", when(async assert => {
    const countit = Observable.range(1,7).count(i => i % 2 === 1);
    const itresult = await countit[Symbol.asyncIterator]().next();
    assert.equal(itresult.value, 4, "The counted result should equal 4.");
    assert.end();
}));

test("Max should identify highest number.", when(async assert => {
    //const maximum = Observable.random(1, 100, 10).max();

    assert.fail("Test not implemented.");
    assert.end();
}));

test("Min should identify lowest number.", when(async assert => {
    assert.fail("Test not implemented.");
    assert.end();
}));

test("Min should identify lowest number.", when(async assert => {
    assert.fail("Test not implemented.");
    assert.end();
}));