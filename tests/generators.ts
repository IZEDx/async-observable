
import * as test from "tape";
import { Generators } from "../src";
import { when, time, sleep } from "./utils";

const cbfunc = (v: any, cb: (err: any, v: boolean) => void) => {
    if (v === undefined) {
        setImmediate(() => cb(new Error("This is an error."), false));
    } else {
        setImmediate(() => cb(undefined, true));
    }
}

test("callback should return successful", when(async assert => {
    let c = 0;
    const it = Generators.callback(true, cbfunc);
    for await(const result of it) {
        assert.equal(result, true);
        c++;
    }
    assert.equal(c, 1);
    assert.end();
}));

test("callback should throw an error", when(async assert => {
    const it = Generators.callback(undefined, cbfunc);
    let res: any;
    let c = 0;
    try {
        for await(const result of it) {
            res = result;
            c++;
        }
    } catch(err) {
        res = err;
    }
    assert.true(res instanceof Error);
    assert.equal(c, 0);
    assert.end();
}));

test("interval should take the estimated time", when(async assert => {
    const started = time(250);
    for await(const i of Generators.interval(250, 4)) {
        assert.equal(time(250) - started, i);
    }
    assert.end();
}));

test("interval should yield the correct amount", when(async assert => {
    let c = 0;
    for await(const i of Generators.interval(1, 4)) {
        assert.equal(i, c++);
    }
    assert.equal(c, 4);
    assert.end();
}));

test("of should yield all expected values", when(async assert => {
    let c = 0;
    for await(const i of Generators.of(0,1,2,3,4,5)) {
        assert.equal(i, c++);
    }
    assert.equal(c, 6);
    assert.end();
}));

test("of should wait on promises", when(async assert => {
    const promises = [sleep(250), sleep(500), sleep(750), sleep(1000)];
    const started = time(250);
    let c = 0;
    for await(const _ of Generators.of(...promises)) {
        assert.equal(time(250) - started, ++c);
    }
    assert.equal(c, 4);
    assert.end();
}));

test("range should yield all expected values", when(async assert => {
    let c = 0;
    for await(const i of Generators.range(1, 10)) {
        assert.equal(i, ++c);
    }
    assert.equal(c, 10);
    assert.end();
}));

test("create should push values", when(async assert => {
    const it = Generators.create(observer => {
        observer.next(0);
        observer.next(1);
        observer.next(2);
        observer.return();
    });

    let c = 0;
    for await(const i of it) {
        assert.equal(i, c++);
    }
    assert.equal(c, 3);
    assert.end();
}));

test("create should throw an error", when(async assert => {
    const it = Generators.create(observer => {
        observer.next(0);
        observer.next(1);
        observer.throw(new Error("random error"));
        observer.return();
    });

    let c = 0;
    let err: Error|undefined;
    try {
        for await(const i of it) {
            assert.equal(i, c++);
        }
    } catch(e) {
        err = e;
    }
    assert.equal(c, 2);
    assert.true(err instanceof Error);
    assert.end();
}));
