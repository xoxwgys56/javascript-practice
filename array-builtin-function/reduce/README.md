# reduce

## 용례

### sum

```js
/** 
 * 예시 코드는 아래의 의미이다.
 * sum([1, 2, 3, 4, 5]) + sum(0)
 * 
 * 그러므로, 예시 코드는 아래의 코드와 같다.
 * (accumulator, current) => accumulator + current
*/
const sum = [1, 2, 3, 4, 5].reduce(
    (accumulator, current) => accumulator + current, 0
);
```

### avg

```js
const sum = [1, 2, 3, 4, 5].reduce(
    (acc, cur, idx, arr) => {
        if (idx === arr.length -1)
            return (acc + cur) / arr.length;
        return acc + cur;
    }, 0
);
```

## 함수원형

`reduce`는 최대 4개의 인자를 가집니다.

1. 누산기 (acc)
2. 현재 값 (cur)
3. 현재 인덱스 (idx)
4. 원본 배열 (src)

```js
arr.reduce(callback[, initialValue])
```

## 예시

### 중첩 배열 펼치기

```js
const flatted = [[0, 1], [2, 3], [4, 5]].reduce(
    (acc, cur) => acc.concat(cur), []
);
```