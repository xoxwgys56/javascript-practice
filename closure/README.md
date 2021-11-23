# closure

## 어휘적 범위 지정 (lexical scoping)

```js
/** 
 * parent function
*/
function init() {
    var name = "Mozilla"; // local var
    /** 
     * inner function, closure.
    */
    function displayName() {
        // has no local variable in this scope
        alert(name); // use variable which defined by parent function.
    }
    displayName();
}

init(); // alert with message "Mozilla"
```

### Closure

```js
function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}

var myFunc = makeFunc(); // return makeFunc.displayName
// 유효범위의 어휘적 환경을 유지 <- ???

// call makeFunc.displayName(). means access makeFunc.name
myFunc(); // alert with message "Mozilla"
```

위의 예시코드와 같은 동작을 수행한다. 하지만 이것은 `javascript`에서 우리가 예상하는 것과는 다르다.  
린턴하는 함수가 클로저를 형성하고 있기 때문에 변수 `name`에 접근할 수 있는 것이다.  

**클로저**는 함수와 함수가 선언된 어휘적 환경의 조합이다.  

첫번째 예시의 경우, `myFunc()`은 `makeFunc()`이 실행될 때 생성된 `displayName()` 인스턴스에 대한 참조이다.  
이러한 이유로 `myFunc`가 호출될 때 변수 `name`은 사용할 수 있는 상태로 남게 된다.  

환경이 저장된다는 의미를 아래의 예시를 통해 더 알아보자.  

```js
function makeAdder(x) {
    var y = 1;
    return function(z) {
        y = 100;
        return x + y + z;
    }
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);
// closure에 x, y 환경이 저장됨.

console.log(add5(2));
console.log(add10(2));
```

`makeAdder()`는 함수를 만들어내는 공장이다. 이는 `makeAdder()`가 특정한 값을 인자로 가질 수 싰는 함수들을 리턴한다는 것을 의미한다.  

`add5`, `add10` 둘 다 클로저이다.  
이 둘은 같은 함수 정의를 공유하지만, 서로 다른 맥락(어휘)적 환경을 저장한다.  
함수 내부를 보면, `y`의 값이 1에서 100으로 변경된 것을 볼 수 있다. (`x`도 가능하다.)  
이는 클로저가 리턴된 후에도 외부함수의 변수들에 접근 가능하다는 것을 보여주는 포인트이다.  

### 실용적인 클로저

클로저는 어떤 데이터(lexical env)와 그 데이터를 조작하는 함수를 연관시켜주기 때문에 유용하다.  
이것은 object가 어떤 데이터와(object 속성) 하나 혹은 그 이상의 메소드들을 연관시킨다는 점에서 **OOP**와 분명히 같은 맥락에 있다.  

결론적으로 오직 하나의 메소드를 가지고 있는 object를 일반적으로 사용하는 모든 곳에 _클로저_를 사용할 수 있다.  

#### 웹 예시

이런 경우는 특히 웹에서 볼 수 있다. FE javascript에서 우리가 쓰는 많은 코드가 이벤트 기반이다.  
우리는 몇가지 동작을 정의한 다음, 사용자에 의한 이벤트에 연결한다. (event listener)  
우리의 코드는 일반적으로 콜백으로 첨부된다. 이벤트에 응답하여 실행되는 단일 함수다.  

```css
body {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 12px;
}
h1 { font-size: 1.5em; }
h2 { font-size: 1.2em; }
```

```html
<p>Some paragraph text</p>
<h1>some heading 1 text</h1>
<h2>some heading 2 text</h2>

<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a>
```

클로저를 이용해 아래와 같이 하나의 함수를 통해 여러 이벤트 리스너를 설정할 수 있었다.  

```js
function makeSizer(size) {
    return function() {
        document.body.size.fontSize = size + "px";
    };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

// 
document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```

### 클로저 이용해서 private method 흉내내기

javascript는 태생적으로 `private`을 지원하지 않지만, 클로저를 이용해서 흉내낼 수 있다.  
아래 코드는 `private` 함수와 변수에 접근하는 `public` 함수를 정의하기 위해 클로저를 사용하는 방법을 보여준다.  
이렇게 클로저를 사용하는 것을 모듈 패턴이라고 한다. (클로저로만 구현할 수 있는 것은 아니다.)  

```js
var counter = (function() {
    var privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1);
        },
        value: function() {
            return privateCounter;
        }
    }
})();

console.log(counter.value());
counter.increment();
counter.increment();
console.log(counter.value());
counter.decrement();
console.log(counter.value());
```

## Closure scope chain

모든 클로저에는 세가지 범위(scope)가 있다.

- local scope, own scope
- outer function scope
- global scope

우리는 클로저에 대해 세가지 범위 모두 접근할 수 있지만, 중첩된 내부 함수가 있는 경우 종종 실수할 수 있다:

```js
```
