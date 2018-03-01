
export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
export const time = (v: number) => Math.round((new Date()).getTime() / v);

export function when<T>(fn: (assert: T) => Promise<any>) {
    return (assert: T) => fn(assert);
}
