export declare function polyfillAsyncIterator(): void;
export declare type MaybePromise<T> = Promise<T> | T;
export declare type Optional<T> = {
    [P in keyof T]?: T[P];
};
export declare function immediate<T, K>(fn: (...args: K[]) => T | Promise<T>, ...args: K[]): Promise<T>;
export * from "./observable";
export * from "./observer";
export * from "./operators/";
