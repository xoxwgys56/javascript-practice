# JS Immutability
#생활코딩 #js #immutable
[JavaScript immutability - 3.0. 변수 할당 방식 비교 - YouTube](https://www.youtube.com/watch?v=odymmcPGAWc&list=PLuHgQVnccGMBxNK38TqfBWk-QpEI7UkY8&index=3)

## Data type
### Primitive
원자단위, 더 이상 쪼갤 수 없는 자료형의 의미. [mozilla-primitive](https://developer.mozilla.org/ko/docs/Glossary/Primitive) 참조.
`string`, `number`, `undefined`, `symbol`, `null`, `bigint`, `boolean`이 포함됨. (총 7가지)
### Object
객체. `Array`, `function`은 기능이 추가된 객체

## Immutable
1은 더 이상 다른 값이 될 수 없다. 이 경우 1은 `immutable`하다고 한다.
객체의 경우 `immutable`하지 않다.

``` js
// variable-comparison.js

var p1 = 1;
var p2 = 1;
console.log(p1, p2, p1 === p2);
// 1 1 true
var p3 = 2;
console.log(p1, p3, p1 === p3);
// 1 2 false

var o1 = { name: 'kim' };
var o2 = { name: 'kim' };
console.log(o1, o2, o1 === o2);
// {name: "kim"} {name: "kim"} false
```

변수가 각각 다른 값을 할당받은 경우, 메모리에 새로운 공간을 만든다.  
그러나 객체의 경우는 값을 할당받을 때마다 메모리에 새로운 공간을 만든다.

```js
var o3 = o1;
o3.name = "lee"
```

그렇다면 어떻게 `o3`가 원본데이터를 훼손하지 않고 값을 변경할 수 있을까 = `o1`이 불변하게 할 수 없을까? 객체를 복사해서 사용하면 된다. 원본 데이터는 불변하면서, 복제된 데이터는 가변해서 사용 가능하다.
만약 복제본의 값을 변경해도 원본은 불변하다.

### use `.assign()`

``` js
// use-assign.js

var o1 = { name: 'kim' };
var o2 = Object.assign({}, o1);

o2.name = 'lee';

console.log(o1, o2, o1 === o2);
// { name: 'kim' } { name: 'lee' } false
```

`o1` is immutable now.

``` js
// assign-object.js

var o1 = { name: 'kim', score: [1, 2] };
var o2 = Object.assign({}, o1);

o2.score.push(3);
console.log(o1, o2);
// { name: 'kim', score: [ 1, 2, 3 ] } { name: 'kim', score: [ 1, 2, 3 ] } 
console.log(o1 === o2, o1.score === o2.score);
// false true
```

객체의 `property` 중 객체가 있다면, 기존의 객체의 주소를 할당한다.

그렇기 때문에, `o1`은 불변하지 않게 되었다.  그래서 객체를 복제하여 할당했다.
`Object.assign`을 사용하지 않은 이유는, 사용하게 되면 배열을 고유 기능을 잃게 되기 때문.   

### use `.concat()`

``` js
// assign-object.js
// after add `o2.score.concat()`

var o1 = { name: 'kim', score: [1, 2] };
var o2 = Object.assign({}, o1);

o2.score = o2.score.concat(); // add for immutability
o2.score.push(3);

console.log(o1, o2);
// { name: 'kim', score: [ 1, 2 ] } { name: 'kim', score: [ 1, 2, 3 ] }
console.log(o1 === o2, o1.score === o2.score, o2.name === o1.name)
// false false true
```

---
## Immutable function

``` js
function fn(person) {
   // change value. makes mutable.
   person.name = 'lee';
}

var o1 = { name: 'kim' };

fn(o1);
console.log(o1);
// { name: 'lee' }
```

함수에서 값을 바꾸기 때문에 불변하지 않게 되었다.

``` js
function fn(person) {
  person = Object.assign({}, person);
  person.name = 'lee';

  return person;
}

var o1 = { name: 'kim' };
var o2 = fn(o1);
console.log(o1, o2, o1 === o2);
```

함수에서 값을 반환함으로서 복제본을 할당받는다.  

다른 방법으로는 복제본을 함수에 보내는 방법도 있을 것이다.

``` js
function fn(person) {
  person.name = 'lee';
}

var o1 = { name: 'kim' };
var o2 = Object.assign({}, o1);
fn(o2);
console.log(o1, o2, o1 === o2);
```

두 코드의 결과는 같다.  

``` bash
❯ node 4
{ name: 'kim' } { name: 'lee' } false
```


### immutable function
``` js
var score = [1, 2, 3];
// 원본을 바꿈
// score.push(4);
var score2 = score.concat(4);
console.log(score, score2);
```


## 원천적으로 막는 법
#### use `Object.freeze`
객체의 property를 얼린다.

``` js
var o1 = { name: 'kim', score: [1, 2, 3] };
Object.freeze(o1);
o1.name = 'lee';

console.log(o1);
```

``` bash
❯ node 6
{ name: 'kim', score: [ 1, 2, 3 ] }
```

`name`이 *변경되지* 않았다.  
그러나 아직 `object property`는 가변적이다.

``` js
var o1 = { name: 'kim', score: [1, 2, 3] };
Object.freeze(o1);
o1.name = 'lee';
o1.city = 'seoul';
o1.score.push(4);
console.log(o1);
```

``` bash
❯ node 6
{ name: 'kim', score: [ 1, 2, 3, 4 ] }
```

`push`로 4가 추가되었다.

``` js
var o1 = { name: 'kim', score: [1, 2, 3] };
Object.freeze(o1);
Object.freeze(o1.score); // add
...
```

나머지 코드는 위의 코드와 같다.  
실행 시 에러가 발생한다.  

``` bash
o1.score.push(4);
         ^

TypeError: Cannot add property 3, object is not extensible
    at Array.push (<anonymous>)
```

`push`로 추가할 수 없다는 에러가 나온다.  
## Const vs Object.freeze

``` js
const o1 = { name: 'kim' };
Object.freeze(o1);

const o2 = { name: 'kim' };
o1 = o2;
```

할당할 수 없기 때문에 에러가 발생한다.

``` bash
o1 = o2;
   ^

TypeError: Assignment to constant variable.
```

프로퍼티 또한 `freeze`로 얼려졌기 때문에 변경이 안된다.

``` js
const o1 = { name: 'kim' };
Object.freeze(o1);

const o2 = { name: 'kim' };

o1.name = 'park';
console.log(o1);
```

``` bash
❯ node 7
{ name: 'kim' }
```

---
## 결론
`const` <- Primitive
`Object.freeze()` <- Object

각각에 대응되어서 변수를 불변하게 만든다.

가변적인 변수를 만드는 것은 디지털의 특권이기도 하지만, 동시에 필요한 내용을 불변하게 만드는 것도 필요하다.

[Immutability | PoiemaWeb](https://poiemaweb.com/js-immutability)