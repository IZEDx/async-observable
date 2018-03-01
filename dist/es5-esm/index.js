function polyfillSymbol(name) {
    Symbol[name] = Symbol[name] !== undefined ? Symbol[name] : Symbol.for(name);
}
export function polyfillAsyncIterator() {
    polyfillSymbol("asyncIterator");
}
polyfillAsyncIterator();
export * from "./observable";
export * from "./observer";
export * from "./operators/";
//# sourceMappingURL=index.js.map