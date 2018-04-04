import { Generators } from ".";

(async () => {
    const it = Generators.create(observer => {
        observer.next(0);
        observer.next(1);
        observer.next(2);
        observer.return();
    });
    
    let c = 0;
    for await(const i of it) {
        console.log(++c, i);
    }
})();