
/**
 * An Observer can subscribe on an Observable,
 * after which its functions will be called by the Observable.
 */
export interface IObserver<T> {
    next(value: T): Promise<void>|void;
    error?(error: Error): Promise<void>|void;
    complete?(): Promise<void>|void;
}