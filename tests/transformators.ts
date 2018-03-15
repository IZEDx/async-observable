
import * as test from "tape";
import { Transformators as T, Generators as G } from "../src";
import { when } from "./utils";

test("map should map correctly", when(async assert => {
    let c = 0;

    const it = T.map(
        G.range(0, 10),
        i => i*2
    );
        
    for await(const result of it) {
        assert.equal(result, c*2);
        c++;
    }

    assert.equal(c, 11);
    assert.end();
}));
