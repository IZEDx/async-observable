export interface IObserver<T> {
    next(value: T): Promise<void> | void;
    error?(error: Error): Promise<void> | void;
    complete?(): Promise<void> | void;
}
