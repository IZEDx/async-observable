export declare type AsyncOperator<T, K = T> = (input: AsyncIterable<T>, ...args: any[]) => AsyncIterable<K>;
import * as Generators from "./generators";
import * as Filters from "./filters";
import * as Aggregators from "./aggregators";
import * as Transformators from "./transformators";
import * as Utilities from "./utilities";
declare const Operators: {
    forEach<T>(input: AsyncIterable<T>, fn: (value: T) => void | Promise<void>): AsyncIterable<T>;
    map<T, K>(input: AsyncIterable<T>, fn: (value: T) => K | Promise<K>): AsyncIterable<K>;
    flatMap<T, K, O extends AsyncIterable<K>>(input: AsyncIterable<T>, fn: (value: T) => O): AsyncIterable<K>;
    count<T>(input: AsyncIterable<T>, predicate?: ((value: T) => boolean | Promise<boolean>) | undefined): AsyncIterable<number>;
    max<T extends number>(input: AsyncIterable<T>, comparer?: Aggregators.CompareFunction<T> | undefined): AsyncIterable<T>;
    max<T>(input: AsyncIterable<T>, comparer: Aggregators.CompareFunction<T>): AsyncIterable<T>;
    min<T extends number>(input: AsyncIterable<T>, comparer?: Aggregators.CompareFunction<T> | undefined): AsyncIterable<T>;
    min<T>(input: AsyncIterable<T>, comparer: Aggregators.CompareFunction<T>): AsyncIterable<T>;
    reduce<T, K = T>(input: AsyncIterable<T>, fn: (acc: K, curr: T) => K, seed: K): AsyncIterable<K>;
    filter<T>(input: AsyncIterable<T>, fn: (value: T) => boolean | Promise<boolean>): AsyncIterable<T>;
};
export { Generators, Operators, Filters, Aggregators, Transformators, Utilities };
