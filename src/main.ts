
import * as Generators from "./generators";
import * as Operators from "./operators";

function polyfillSymbol(name: string) {
    (<any>Symbol)[name] = Symbol[name] !== undefined ? Symbol[name] : Symbol.for(name);
}

export function polyfillAsyncIterator() {
    polyfillSymbol("asyncIterator");
}

polyfillAsyncIterator();

export { Observable } from "./observable";
export { AsyncObserver, IObserver } from "./observer";
export { Generators, Operators };
