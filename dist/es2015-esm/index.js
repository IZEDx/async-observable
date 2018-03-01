import * as Generators from "./generators";
import * as Operators from "./operators";
function polyfillSymbol(name) {
    Symbol[name] = Symbol[name] !== undefined ? Symbol[name] : Symbol.for(name);
}
export function polyfillAsyncIterator() {
    polyfillSymbol("asyncIterator");
}
polyfillAsyncIterator();
export * from "./observable";
export * from "./observer";
export { Generators, Operators };
//# sourceMappingURL=index.js.map