var foo = (function(x) {
    return x + 1;
});

var foo2 = (function(x) {
    let count = foo(0);

    return {
        value() {
            count = foo(x) + 1;
            return count;
        },
        increase() {
            count += 1;
        }
    };
})(1);

/**
 * 마치 `main()`인 것처럼 동작하고 있음.
 * 이를 즉시 호출하는 익명함수라고 하는듯.
 */
(function() {
    console.log(foo(1));
    foo2.increase();
    foo2.increase();
    console.log(foo2.value());
})();


