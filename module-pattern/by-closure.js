const counter = (function() {
    let privateValue = 0;

    const changeBy = (n) => privateValue += n;

    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1)
        },
        value: function() {
            return privateValue;
        },
        logValue() {
            console.log(`value is ${privateValue}.`);
        },
    }
})();

console.log(counter.value());
counter.increment();
counter.increment();
console.log(counter.value());
counter.decrement();
console.log(counter.value());