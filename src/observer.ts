
/**
 * An Observer can subscribe on an Observable,
 * after which its functions will be called by the Observable.
 */
export interface IObserver<T> {
    next(value: T): Promise<void>|void;
    error?(error: Error): Promise<void>|void;
    complete?(): Promise<void>|void;
}

export class Observer<T> implements IObserver<T> {
    
    constructor(private obs: IObserver<T>) {
    }

    next(value: T): Promise<void>|void {
        return this.obs.next(value);
    }

    complete(): Promise<void>|void {
        if (this.obs.complete) {
            return this.obs.complete();
        }
    }

    error(error: Error): Promise<void>|void {
        if (this.obs.error) {
            return this.obs.error(error);
        }
    }
}