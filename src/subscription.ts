import { Observable, IObserver, immediate } from ".";

export class Subscription<T> {
    private cleanup?: () => void;
    readonly wait: Promise<void>;
    closed = false;

    constructor(public readonly observable: Observable<T>, public readonly observer?: IObserver<T>) {
        this.wait = immediate(() => this.run());
    }

    async run(): Promise<void> {
        try {
            const next = this.observer && this.observer.next;
            for await(const data of this.observable) {
                if (this.closed) break;
                if (!this.cleanup) this.cleanup = this.observable.cleanup;
                if (!next) continue;
                const r = next(data);
                if (r instanceof Promise) {
                    await r;
                }
            }

            if (!this.observer || !this.observer.return) return;
            const r = this.observer.return();
            if (r instanceof Promise) {
                await r;
            }
        } catch (e) {
            if (!this.observer || !this.observer.throw) return;
            const r = this.observer.throw(e);
            if (r instanceof Promise) {
                await r;
            }
        }
    }

    unsubscribe() {
        this.closed = true;
        if (this.cleanup) this.cleanup();
    }
}