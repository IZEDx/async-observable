"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function polyfillSymbol(name) {
    Symbol[name] = Symbol[name] !== undefined ? Symbol[name] : Symbol.for(name);
}
polyfillSymbol("asyncIterator");
//# sourceMappingURL=asynciterable.js.map