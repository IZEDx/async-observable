var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function polyfillSymbol(name) {
    Symbol[name] = Symbol[name] !== undefined ? Symbol[name] : Symbol.for(name);
}
export function polyfillAsyncIterator() {
    polyfillSymbol("asyncIterator");
}
polyfillAsyncIterator();
export function immediate(fn, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(res => {
            setImmediate(() => {
                const t = fn(...args);
                if (t instanceof Promise) {
                    t.then(res);
                }
                else {
                    res(t);
                }
            });
        });
    });
}
export * from "./observable";
export * from "./observer";
export * from "./operators/";
//# sourceMappingURL=index.js.map