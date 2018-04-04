
import * as test from "tape";
import { Observable } from "../src";
import { when, time, sleep } from "./utils";

const cbfunc = (v: any, cb: (err: any, v: boolean) => void) => {
    if (v === undefined) {
        setImmediate(() => cb(new Error("This is an error."), false));
    } else {
        setImmediate(() => cb(undefined, true));
    }
}

test("Callback should return successful.", when(async assert => {
    let c = 0;
    const it = Observable.callback(true, cbfunc);
    for await(const result of it) {
        assert.equal(result, true, "Result should be true to indicate success.");
        c++;
    }
    assert.equal(c, 1, "It should end after 1 iteration.");
    assert.end();
}));

test("Callback should throw an error", when(async assert => {
    const it = Observable.callback(undefined, cbfunc);
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
    assert.true(res instanceof Error, "Error should be caught.");
    assert.equal(c, 0, "It shouldn't iterate once.");
    assert.end();
}));

test("Interval should take the estimated time.", when(async assert => {
    const started = time(250);
    for await(const i of Observable.interval(250, 4)) {
        assert.equal(time(250) - started, i, "250ms should pass.");
    }
    assert.end();
}));

test("Interval should yield the correct amount.", when(async assert => {
    let c = 0;
    for await(const i of Observable.interval(1, 4)) {
        assert.equal(i, c++, "Value should be incremented by one.");
    }
    assert.equal(c, 4, "Total count should be 4.");
    assert.end();
}));

test("Of should yield all expected values.", when(async assert => {
    let c = 0;
    for await(const i of Observable.of(0,1,2,3,4,5)) {
        assert.equal(i, c++, "Passed value should correspond to one increment.");
    }
    assert.equal(c, 6, "Total count should be 6.");
    assert.end();
}));

test("Of should wait on promises.", when(async assert => {
    const promises = [sleep(250), sleep(500), sleep(750), sleep(1000)];
    const started = time(250);
    let c = 0;
    for await(const _ of Observable.of(...promises)) {
        assert.equal(time(250) - started, ++c, "250ms should have passed.");
    }
    assert.equal(c, 4, "Total count should be 4.");
    assert.end();
}));

test("Range should yield all expected values.", when(async assert => {
    let c = 0;
    for await(const i of Observable.range(1, 10)) {
        assert.equal(i, ++c, "Value should be incremented by one.");
    }
    assert.equal(c, 10, "Total count should be 10.");
    assert.end();
}));

test("create should push values", when(async assert => {
    const it = Observable.create(observer => {
        observer.next(0);
        observer.next(1);
        observer.next(2);
        observer.return();
    });

    let c = 0;
    for await(const i of it) {
        console.log(i);
        assert.equal(i, c++, "Value should be incremented by one.");
    }
    assert.equal(c, 3, "Total count should be 3.");
    assert.end();
}));

test("Create should throw an error", when(async assert => {
    const it = Observable.create(observer => {
        observer.next(0);
        observer.next(1);
        observer.throw(new Error("random error"));
    });

    let c = 0;
    let err: Error|undefined;
    try {
        for await(const i of it) {
            assert.equal(i, c++, "Value should increment twice.");
        }
    } catch(e) {
        err = e;
    }
    assert.equal(c, 2, "Total count should be 2.");
    assert.true(err instanceof Error, "Error should be thrown and caught.");
    assert.end();
}));
