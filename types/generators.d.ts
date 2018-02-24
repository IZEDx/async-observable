import { IAsyncIterable } from "./asynciterable";
import { IObserver } from "./observer";
export declare function of<T>(...values: (T | Promise<T>)[]): IAsyncIterable<T>;
export declare function range(from: number, to: number, step?: number): IAsyncIterable<number>;
export declare function create<T>(creator: (observer: IObserver<T>) => void): IAsyncIterable<T>;
