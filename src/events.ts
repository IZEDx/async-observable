import { Observable, BufferedObserver } from ".";

export interface Listener<T> {
    (event: T): any;
}
  
export interface Disposable {
    dispose(): void;
}
  
export class TypedEvent<T> {
    private observers: BufferedObserver<T>[] = [];

    constructor() {

    }
  
    on(fn?: (observer: BufferedObserver<T>) => void): Observable<T> {
        return Observable.create(observer => this.observers.push(observer as BufferedObserver<T>) && fn && fn(observer as BufferedObserver<T>));
    }
  
    emit(event: T) {
        this.observers.forEach(observer => observer.next(event));
    }

    off(observer: BufferedObserver<T>) {
        const idx = this.observers.indexOf(observer);
        if (idx !== -1) {
            this.observers.splice(idx, 1);
        }
    }
  }