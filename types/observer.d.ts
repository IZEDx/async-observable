import { MaybePromise } from ".";
export declare class ObserverError extends Error {
}
export interface IObserver<T> {
    next(value: T): MaybePromise<void>;
    throw?(error: Error): MaybePromise<void>;
    return?(): MaybePromise<void>;
}
export declare class Observer<T> implements IObserver<T> {
    private obs;
    constructor(obs: IObserver<T>);
    next(value: T): MaybePromise<void>;
    return(): MaybePromise<void>;
    throw(error: Error): MaybePromise<void>;
}
export declare type Emitter<T> = (observer: Observer<T>) => void;
export declare class BufferedObserver<T> extends Observer<T> {
    private _waitingNext;
    private _waitingError;
    private _resultQueue;
    private _thrownError;
    private _done;
    private _started;
    readonly thrownError: Error | undefined;
    readonly done: boolean;
    readonly started: boolean;
    constructor();
    wait(): Promise<IteratorResult<T>>;
}
