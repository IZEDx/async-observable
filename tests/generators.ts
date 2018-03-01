
import { expect } from "chai";
import { Generators } from "../src/main";
import { when, time, sleep } from "./utils";

const cbfunc = (v: any, cb: (err: any, v: boolean) => void) => {
    if (v === undefined) {
        setImmediate(() => cb(new Error("This is an error."), false));
    } else {
        setImmediate(() => cb(undefined, true));
    }
}

describe("AsyncGenerators", () => {

    describe("callback", () => {

        it("returns successful", when(async () => {
            let c = 0;
            const it = Generators.callback(true, cbfunc);
            for await(const result of it) {
                expect(result).to.equal(true);
                c++;
            }
            expect(c).to.equal(1);
        }));

        it("throws an error", when(async () => {
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
            expect(res).to.be.instanceof(Error);
            expect(c).to.equal(0);
        }));

    });

    describe("interval", () => {

        it("takes the estimated time", when(async () => {
            const started = time(250);
            for await(const i of Generators.interval(250, 4)) {
                expect(time(250) - started).to.equal(i);
            }
        }));

        it("yields the correct amount", when(async () => {
            let c = 0;
            for await(const i of Generators.interval(1, 4)) {
                expect(i).to.equal(c++);
            }
            expect(c).to.equal(4);
        }));

    });

    describe("of", () => {

        it("yields all expected values", when(async () => {
            let c = 0;
            for await(const i of Generators.of(0,1,2,3,4,5)) {
                expect(i).to.equal(c++);
            }
            expect(c).to.equal(6);
        }));

        it("waits on promises", when(async () => {
            const promises = [sleep(250), sleep(500), sleep(750), sleep(1000)];
            const started = time(250);
            let c = 0;
            for await(const _ of Generators.of(...promises)) {
                expect(time(250) - started).to.equal(++c);
            }
            expect(c).to.equal(4);
        }));

    });

    describe("range", () => {

        it("yields all expected values", when(async () => {
            let c = 0;
            for await(const i of Generators.range(1, 10)) {
                expect(i).to.equal(++c);
            }
            expect(c).to.equal(10);
        }));

    });

    describe("create", () => {

        it("pushes values", when(async () => {
            const it = Generators.create(observer => {
                observer.next(0);
                observer.next(1);
                observer.next(2);
                observer.return();
            });

            let c = 0;
            for await(const i of it) {
                expect(i).to.equal(c++);
            }
            expect(c).to.equal(3);
        }));

        it("throws an error", when(async () => {
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
                    expect(i).to.equal(c++);
                }
            } catch(e) {
                err = e;
            }
            expect(c).to.equal(2);
            expect(err).to.be.instanceof(Error);
        }));



    });
});
