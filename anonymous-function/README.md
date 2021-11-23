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