/**
 * 함수를 이용한 모듈패턴처럼 속성값을 가질 수 있게 구현하였다.
 * 
 * 이로 인해 `value`만 함수가 아닌 값으로 호출되었는데 
 * 이는 통일성을 해친다는 생각이 들어서 함수로 호출될 수 있도록 
 * `_value`라는 `private` 변수같은 속성을 만들었다.
 * 
 * + 당연한거지만 `_value`는 외부 접근이 허용되고, `private`도 아니다.
 */
const counter = {
    _value: 0,
    // 이런 표현도 허용되는줄 몰랐다.
    printValue() {
        console.log(`current value is "${this._value}"".`);
    },
    value: function() {
        return this._value;
    },
    increment: function(n) {
        this._value += n;
    },
    decrement: function(n) {
        this._value -= n;
    }
};

counter.increment(1);
console.log(counter.value());
console.log(counter._value);
counter.printValue();