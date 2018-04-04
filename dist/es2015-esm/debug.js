var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
import { Observable } from ".";
(() => __awaiter(this, void 0, void 0, function* () {
    const it = Observable.create(observer => {
        observer.next(0);
        observer.next(1);
        observer.next(2);
        observer.return();
    });
    let c = 0;
    try {
        for (var it_1 = __asyncValues(it), it_1_1; it_1_1 = yield it_1.next(), !it_1_1.done;) {
            const i = yield it_1_1.value;
            console.log(++c, i);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (it_1_1 && !it_1_1.done && (_a = it_1.return)) yield _a.call(it_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var e_1, _a;
}))();
//# sourceMappingURL=debug.js.map