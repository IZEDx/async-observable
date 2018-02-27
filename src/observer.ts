
/**
 * An Observer can subscribe on an Observable,
 * after which its functions will be called by the Observable.
 */
export interface IObserver<T> {
    next(value: T): Promise<void>|void;
    throw?(error: Error): Promise<void>|void;
    return?(): Promise<void>|void;
}

export class AsyncObserver<T> implements IObserver<T> {
    
    constructor(private obs: IObserver<T>) {
    }

    next(value: T): Promise<void>|void {
        return this.obs.next(value);
    }

    return(): Promise<void>|void {
        if (this.obs.return) {
            return this.obs.return();
        }
    }

    throw(error: Error): Promise<void>|void {
        if (this.obs.throw) {
            return this.obs.throw(error);
        }
    }
}
