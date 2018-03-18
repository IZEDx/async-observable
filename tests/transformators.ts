
import * as test from "tape";
import { Transformators as T, Generators as G } from "../src";
import { when } from "./utils";

test("Map should map correctly.", when(async assert => {
    let c = 0;

    const it = T.map(
        G.range(1, 10),
        i => i*2
    );
        
    for await(const result of it) {
        c++;
        assert.equal(result, c*2, "Result should be multiplied by 2.");
    }

    assert.equal(c, 10, "Total count should be 10.");
    assert.end();
}));
