export declare function polyfillAsyncIterator(): void;
export interface IAsyncIterable<T> {
    [Symbol.asyncIterator](): AsyncIterator<T>;
}
