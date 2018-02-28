
import { IObserver, AsyncObserver } from "./observer";
import * as AsyncGenerators from "./generators";
import * as AsyncOperators from "./operators";

export interface ReadableStream {
    on(event: "error", cb: (err: Error) => void): void;
    on(event: "close", cb: (hadErr: boolean) => void): void;
    on(event: "data", cb: (data: any) => void): void;
    on(event: string, cb: Function): void;
}

/**
 * An Observable produces an asynchronous stream of values once iterated over or subscribed on.
 * Observable methods operate on the asynchronous stream of values as they come by returning a new observable.
 * Using this it's possible to create an asynchronous operator chain.
 *
 * eg.
 * ```
 *  const myObservable = Observable.for(0, 100, 10).map(i => i += 5);
 *
 *  myObservable.subscribe({next: console.log});
 *
 *  for await(const i of myObservable) {
 *      console.log(i);
 *  }
 * ```
 */
export class Observable<T> implements AsyncIterable<T> {
    public [Symbol.asyncIterator]: () => AsyncIterator<T>;

    constructor(ai: AsyncIterable<T>) {
        Object.assign(this, ai);
    }

    // Generators 

    public static of<T>(...values: (T|Promise<T>)[]): Observable<T> {
        return new Observable(AsyncGenerators.of(...values));
    }

    public static create<T>(creator: (observer: AsyncObserver<T>) => void): Observable<T> {
        return new Observable(AsyncGenerators.create(creator));
    }

    public static interval(ms: number): Observable<number> {
        return new Observable(AsyncGenerators.create(observer => {
            let i = 0;
            setInterval(
                () => {
                    observer.next(i);
                    i += 1;
                },
                ms
            );
        }));
    }

    public static range(from: number, to: number, step: number = 1): Observable<number> {
        return new Observable(AsyncGenerators.range(from, to, step));
    }


    public static listen<T>(stream: ReadableStream): Observable<T> {
        return new Observable(AsyncGenerators.create(observer => {
            stream.on("error", err      => observer.throw(err));
            stream.on("close", hadError => observer.return());
            stream.on("data",  data     => observer.next(data));
        }));
    }

    // Operators

    public checkValid(): Observable<T> {
        return this.filter(v => v !== undefined && v !== null);
    }

    public do(fn: (value: T) => Promise<void>|void): Observable<T> {
        return this.forEach(fn);
    }

    public forEach(fn: (value: T) => Promise<void>|void): Observable<T> {
        return new Observable(AsyncOperators.forEach(this, fn));
    }

    public filter(fn: (value: T) => Promise<boolean>|boolean): Observable<T> {
        return new Observable(AsyncOperators.filter(this, fn));
    }

    public map<K>(fn: (value: T) => Promise<K>|K): Observable<K> {
        return new Observable(AsyncOperators.map(this, fn));
    }

    public flatMap<K>(fn: (value: T) => Observable<K>): Observable<K> {
        return new Observable(AsyncOperators.flatMap(this, fn));
    }

    // Subscriber

    public async subscribe(subscriber: AsyncObserver<T>|IObserver<T>): Promise<void> {
        let observer: AsyncObserver<T> = subscriber instanceof AsyncObserver
            ?   subscriber
            :   new AsyncObserver(subscriber);
            
        try {
            for await(const data of this) {
                const r = observer.next(data);
                if (r instanceof Promise) {
                    await r;
                }
            }
        } catch (e) {
            const r = observer.throw(e);
            if (r instanceof Promise) {
                await r;
            }
        }

        const r = observer.return();
        if (r instanceof Promise) {
            await r;
        }
    }

}