"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function polyfillSymbol(name) {
    Symbol[name] = Symbol[name] !== undefined ? Symbol[name] : Symbol.for(name);
}
function polyfillAsyncIterator() {
    polyfillSymbol("asyncIterator");
}
exports.polyfillAsyncIterator = polyfillAsyncIterator;
//# sourceMappingURL=asynciterable.js.map