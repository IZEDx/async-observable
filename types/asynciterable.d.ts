export interface IAsyncIterable<T> {
    [Symbol.asyncIterator](): AsyncIterator<T>;
}
