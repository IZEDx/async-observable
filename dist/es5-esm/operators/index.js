var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as Generators from "./generators";
import * as Filters from "./filters";
import * as Aggregators from "./aggregators";
import * as Transformators from "./transformators";
import * as Utilities from "./utilities";
var Operators = __assign({}, Filters, Aggregators, Transformators, Utilities);
export { Generators, Operators, Filters, Aggregators, Transformators, Utilities };
//# sourceMappingURL=index.js.map