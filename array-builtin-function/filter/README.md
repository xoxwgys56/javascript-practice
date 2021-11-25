# filter

## 용례

```js
const todos = [
    {
        id: 1, text: "introduce", done: true
    },
    {
        id: 2, text: "learning", done: true
    },
    {
        id: 1, text: "intermediate", done: false
    },
]

const tasksNotDone = todos.filter(todo => todo.done === false);
// 아래 코드와 같다.
// const tasksNotDone = todos.filter(todo => !todo.done);
```

## 함수원형

```js
arr.filter(callback(element[, index[, array]])[, thisArg])
```

`callback()` 결과가 `true`인 경우의 모든 값을 보유한 새로운 배열을 생성해 반환한다.

## 예제

### 모든 작은 값 걸러내기

```js
const filtered = [12, 5, 6, 130, 22].filter(value => value >= 10);
```

### `JSON`에서 무효한 항목 거르기

```js
const arr = [
    {id: 15},
    {id: -1},
    {id: 0},
    {},
    {id: null},
];

let invalidEntries = 0;

const filteredById = arr.filter(item => {
    if (item && typeof item === 'number' && item !== 0) {
        return true;
    }
    invalidEntries++;
    return false;
});
```

### 배열 내용 검색

```js
const fruits = ["apple", "banana", "grapes", "mango"];

function filterItems(query) {
    return fruits.filter(
        el => el.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
}

console.log(filterItems("ap"));
console.log(filterItems("an"));
```

### 폴리필

`.filter()`는 ECMA-262 표준 제5판에 추가됐습니다. 따라서 일부 지원하지 않는 브라우저가 있을 수 있습니다.  
아래 알고리즘은 `fn.call`의 계산 값이 원래의 `Function.prototype.call()`과 같고, `Array.prototype.push()`가 변형되지 않은 경우 ECMA-262 제5판이 명시한 것과 동일합니다. 

```js
// `.filter()` 선언되지 않은 경우.
if (!Array.prototype.filter) {
    Array.prototype.filter = function(func, thisArg) {
        "use strict"
        /** 
         * local scope
         * this = list of items
        */
        
        // if not callback function is not typeof 'function'
        if ( !((typeof func === 'Function' || typeof func === 'function') && this) )
            throw new TypeError();

        // [unsigned right shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift)
        var len = this.length >>> 0,
            res = new Array(len), // preallocate array. 
            t = this, c = 0, i = -1;
        
        if (thisArg === undefined) {
            while( ++i !== len) {
                // check to see if the key was set
                if ((i in this) && func(t[i], i, t))
                    res[c++] = t[i];
            }
        }
        else {
            while(++i !== len) {
                // check to see if the key was set
                if ((i in this) && func.call(thisArg, t[i], i, t))
                    res[c++] = t[i];
            }
        }

        // 배열 크기를 적정 사이즈로 줄인다.
        res.length = c;
        return res;
    };
    // end of anonymous function
}
```

---

## References

- [MDN filter function](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)