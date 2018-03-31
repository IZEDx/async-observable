import { OptionalAsync } from ".";

/**
 * An Observer can subscribe on an Observable,
 * after which its functions will be called by the Observable.
 */
export interface IObserver<T> {
    next(value: T): OptionalAsync<void>;
    throw?(error: Error): OptionalAsync<void>;
    return?(): OptionalAsync<void>;
}

export class Observer<T> implements IObserver<T> {
    
    constructor(private obs: IObserver<T>) {
    }

    next(value: T): OptionalAsync<void> {
        return this.obs.next(value);
    }

    return(): OptionalAsync<void> {
        if (this.obs.return) {
            return this.obs.return();
        }
    }

    throw(error: Error): OptionalAsync<void> {
        if (this.obs.throw) {
            return this.obs.throw(error);
        }
    }
}

export type ObserverFunction<T> = (observer: Observer<T>) => void;