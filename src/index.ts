
function polyfillSymbol(name: string) {
    if (Symbol[name] === undefined) (<any>Symbol)[name] = Symbol.for(name);
}

export function polyfillAsyncIterator() {
    polyfillSymbol("asyncIterator");
}

polyfillAsyncIterator();

export type MaybePromise<T> = Promise<T>|T;
export type Optional<T> = { 
    [P in keyof T]?: T[P] 
}


export * from "./observable";
export * from "./observer";
export * from "./subscription";
export * from "./events";
export * from "./operators/";
export * from "./schedule";