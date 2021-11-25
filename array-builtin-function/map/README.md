# map()

## 용례

아래의 예시는 배열의 모든 값을 제곱하여 반환하는 코드입니다:  

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8];

const square = n => n * n;
const squaredArray = array.map(square);

console.log(squaredArray);
```

위 코드를 아래와 같이 단축할 수 있습니다.  

```js
const squaredArray = array.map(n => n * n);
```

`map()`의 파라미터로 *변화*를 주는 함수를 전달해줍시다. *변화함수*라고 부르겠습니다.  
함수원형은 아래와 같습니다.

## 함수원형

```js
arr.map(callback(currentValue[, index[, array]])[, thisArg])
```

- callback
  - 새로운 배열 요소를 생성하는 함수.
  - currentValue
    - 처리할 현재 요소
  - index (optional)
    - 처리할 현재 요소의 인덱스
  - array (optional)
    - `map()`을 호출한 배열
  - thisArg (optional)
    - `callback`을 실행할 때, `this`로 사용되는 값.

### MDN description

`map()`은 `callback()`을 **각각의 요소에 대해 한번씩** 순서대로 불러, 그 함수의 반환값으로 새로운 배열을 만듭니다.  

`callback()`은 요소를 부를 때, `undefined`도 포함한 배열 값이 들어있는 인덱스에 대해서만 호출한다.  
당연히, 값이 삭제되거나 아직 할당/정의되지 않은 인덱스에 대해서 호출되지 않는다.  

### 예시

#### 배열 속 객체 재구성

```js
const kvArray = [
                    {key: 1, value: 10},
                    {key: 2, value: 20},
                    {key: 3, value: 30},
                ];

const reformattedArray = kvArray.map(function(item) {
    const rItem = {};
    rItem[item.key] = item.value;
    return rItem;
});
```

---

## References

- [MDN map function](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)