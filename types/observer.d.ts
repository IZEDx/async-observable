export interface IObserver<T> {
    next(value: T): Promise<void> | void;
    throw?(error: Error): Promise<void> | void;
    return?(): Promise<void> | void;
}
export declare class AsyncObserver<T> implements IObserver<T> {
    private obs;
    constructor(obs: IObserver<T>);
    next(value: T): Promise<void> | void;
    return(): Promise<void> | void;
    throw(error: Error): Promise<void> | void;
}
export declare type ObserverFunction<T> = (observer: AsyncObserver<T>) => void;
