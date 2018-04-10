//import { Observable } from ".";
/*
(async () => {
    const it = Observable.create(observer => {
        observer.next(0);
        observer.next(1);
        observer.next(2);
        observer.return();
    });
    
    let c = 0;
    for await(const i of it) {
        console.log(c++, i);
    }
})();

const printer = (t: string) => ({next: (v: number) => console.log(t, v)});

const int = () => Observable.interval(500, 10);
int().map(x => 10 - x).subscribe(printer("10-x"));

const sub = int().subscribe(printer("x"));

Observable.duration(1200).subscribe({next: () => {}, return: sub.unsubscribe});
*/

const UPDATE_MIN = 0.01 * 60 * 1000;
const UPDATE_MAX = 0.1 * 60 * 1000;
export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

async function test() {
    while (true) {
        const sleepFor = Math.floor(Math.random() * (UPDATE_MAX - UPDATE_MIN + 1) + UPDATE_MIN);
        console.log(sleepFor)
        await sleep(sleepFor);
    }
}

test();