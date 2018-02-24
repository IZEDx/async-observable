
function polyfillSymbol(name: string) {
    (<any>Symbol)[name] = Symbol[name] !== undefined ? Symbol[name] : Symbol.for(name);
}

polyfillSymbol("asyncIterator");

/** 
 * An AsyncIterable can be iterated on asynchronously.
*/
export interface IAsyncIterable<T> {
    [Symbol.asyncIterator](): AsyncIterator<T>; 
}
