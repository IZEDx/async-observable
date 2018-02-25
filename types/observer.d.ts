export interface IObserver<T> {
    next(value: T): Promise<void> | void;
    error?(error: Error): Promise<void> | void;
    complete?(): Promise<void> | void;
}
export declare class Observer<T> implements IObserver<T> {
    private obs;
    constructor(obs: IObserver<T>);
    next(value: T): Promise<void> | void;
    complete(): Promise<void> | void;
    error(error: Error): Promise<void> | void;
}
