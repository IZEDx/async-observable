
/**
 * An AsyncOperator is a function that takes an AsyncIterable and returns an AsyncIterable.
 */
export type AsyncOperator<T, K = T> = (input: AsyncIterable<T>, ...args: any[]) => AsyncIterable<K>;

/**
 * An AsyncGenerator is a function that creates an AsyncIterable, it should provide a function to unsubscribe via callback.
 */
export type AsyncGenerator<T> = (onUnsubscribe: (callback: Function) => void, ...args: any[]) => AsyncIterable<T>;


import * as Generators from "./generators";
import * as Filters from "./filters";
import * as Aggregators from "./aggregators";
import * as Transformators  from "./transformators";
import * as Utilities from "./utilities";

const Operators = { ...Filters, ...Aggregators, ...Transformators, ...Utilities };

export { Generators, Operators, Filters, Aggregators, Transformators, Utilities };