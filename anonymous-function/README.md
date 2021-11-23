# anonymous function

## contents

### Immediate call

[immediate anonymous function call](https://stackoverflow.com/a/4043704/11082758)

```js
(function(name) {
    alert(`${name} is spiderman!`);
})('peter parker');

// alert "peter parker is spiderman!"
```

Read more with [mozilla doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions#the_function_expression_function_expression)

### lambda

[람다, 익명 함수, 클로저](https://hyunseob.github.io/2016/09/17/lambda-anonymous-function-closure/)

#### Lambda calculus

"수학에서 사용하는 함수"를 _보다 단순하게 표현하는 방법_.  
-> 이 말은 프로그래밍에서 람다함수를 사용하는 것과 아주 동일하다.  

1. 람다 대수는 이름을 가질 필요가 없다.
2. 2개 이상의 입력이 있는 함수는. 최종적으로 1개의 입력만 받는 람다 대수로 단순화될 수 있다. (currying)

- 위키에서 [람다 대수](https://ko.wikipedia.org/wiki/%EB%9E%8C%EB%8B%A4_%EB%8C%80%EC%88%98) 더 읽어보기.  
- see more about [Currying](https://en.wikipedia.org/wiki/Currying) in wiki.

#### Anonymous function

대부분의 언어들이 람다 함수(표현)을 지원한다. `Java`는 버전8부터 지원하게 되었다는데, 이 때 람다가 Lambda abstraction(익명 함수)을 말한다.  
각 언어별로 표현법은 다르지만 공통적으로 가지는 특성은 *First-class citizen(일급 객체)*라는 점이다.

#### JS 익명함수

가장 흔한 용례는 *call back*이다. 일회용 함수를 익명 함수를 통해 선언하는데 문법의 변화가 있었다.

```js
// ES5.1
[0, 1, 2, 3, 4].map(function(n) {
    return n * n;
});

// ES2015
[0, 1, 2, 3, 4].map(n => n * n);
```

### 람다와 클로저

클로저는 `Javascript`에만 있는 개념이 아니다. 또한 클로저는 람다로부터 파생된 개념이다.  

```js
function adder(a) {
    return function(b) {
        return a + b;
    }
}

var add5 = adder(5);
add5(10); // 15
```

`add5()` 입장에서 보면, 자신의 스코프 내에 있는 `b`라는 변수는 매개변수로 받은 변수이고.  
`a`라는 변수는 어디서 참조해 사용되는지 알 수가 없다.  
(`a`는 이미 `adder(5)`를 통해 할당되었지만, `add5(10)` 입장에서는 알 수 없기 때문에 **free variable**이라고 언급한 것으로 생각한다. 잘모르겠다.)  
이 때 `a`를 **free variable**, `b`는 **bound variable**이라고 한다.  

람다식은 사용하는 변수의 종류에 따라 두 종류로 나눌 수 있다.  
**Closed expression**과 **Open expression**이다.  

람다 표현식에서 사용하는 모든 변수가 **bound variable**일 때, **Close expression**. 반대의 경우 **Open expression**이다.  
이제 **Closure** 이름에서 알 수 있듯이, 열린 람다식(**Open expression**)을 닫힌 람다식(**Close expression**)으로 만드는 것이다.  
클로저는 람다식 내의 모든 **free variable**을 스코프 안으로 가져와 묶는다.  
이로 인해 클로저는 만들어진 환경을 기억하는 것처럼 보인다. (이를 `lexical environment`라고 본다.)

### Javascript example

```js
var a = 1;
function freeAdder(b) {
    return function(c) {
        return a + b + c;
    }
}

var add2 = freeAdder(2);
add2(3); // 6

a = undefined;
add2(3); // NaN
```

위 예시에서 앞서 사용한 예시에 전역 변수 `a`가 추가되었다.  
여기에서 클로저 `add2()`입장으로 보면, `b`, `a` 모두 **free variable**이므로 똑같이 묶어야 할 것으로 보인다.  

하지만 `Javascript`에서는 클로저를 만들면 클로저가 만들었을 때의 환경이 만들어진다.  
환경 생성 시점에 `b`라는 변수는 존재했지만, `a`는 참조만 하고 있으므로 클로저에서도 동일한 환경이 구성된다.  
따라서 스코프체인에 따라 상위 스코프를 탐색해 `a`를 참조하게 된다.  

## conclusion

익명함수에 관해 알아보았는데, 결국 클로저로 귀결되었다.  
다른 언어에서는 어떤지 모르겠으나, `Javascript`에서 익명함수, 람다, 클로저는 동일한 선상에 있다고 이해된다.  

완전히 같은 개념이라고 할 수는 없겠으나, 모두 scope의 차이를 통해 lexical environment를 만들고  
이를 통해 `scope`에 따른 변수 참조를 한다. 또한 위에서 언급한 범위에는 당연하게도 우선순위가 있다.

1. Local scope, 내 범위
2. outer function scope 혹은 나의 상위 범위
3. global scope, 최상위 범위, 전역

언급되지 않았으나 참조하는 방향은 상위(upward)로 단방향이다. 하위(downward)로의 참조는 존재하지 않는 것이다.  
(만약에 존재한다면 컴파일러가 모호한 해석을 통해 오류를 만들지 않을까?)

---

## Read more

- [difference, closure and lambda](https://stackoverflow.com/questions/220658/what-is-the-difference-between-a-closure-and-a-lambda)
- [lexical environment the hidden part](https://amnsingh.medium.com/lexical-environment-the-hidden-part-to-understand-closures-71d60efac0e0)