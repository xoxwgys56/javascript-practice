# free variable and bound variable

## content

이는 오래된 책들에서 *free variable*은 *real variable* 그리고 *bound variable*은 *apparent variable*로 표현되기도 한다.  
이 아이디어는 **placeholder**(어떤 값으로 대체되는 심볼) 혹은 **wildcard character**같은 불특정 심볼과 연관있다.  

*프로그래밍*에서 **free variable**은 함수에서 이용되지만 지역변수도 파라미터도 아닌 변수를 의미한다.  
**bound variable**은 반대로, 특정 도메인에 *bound*되어 특정 값이나 특정 범위의 값을 가진 변수를 의미한다.

아래 내용은 [what are free and bound variables](https://stackoverflow.com/questions/21855838/what-are-free-and-bound-variables)에 대한 노트이다.  

### free variable

*자유 변수*는 함수가 **호출**되었거나 사용되었을 때, 컨텍스트에 의해 값을 의존하는 변수이다.  
예를 들어 *수학* 용어로, `z`는 *자유 변수*이다. 왜냐하면 어떤 매개변수로도 묶여있지 않기 때문이다.  
그러나 `x`는 *묶인 변수*이다:  

```js
function(x) { return x * z }
```

*프로그래밍* 용어로, *자유 변수*는 동적으로 값이 결정된다. 이는 [`function call stack`](https://en.wikipedia.org/wiki/Call_stack)에 의해 실행시간에 결정된다.  
"[pass by name](https://stackoverflow.com/questions/838079/what-is-pass-by-name-and-how-does-it-work-exactly)" 컨벤션과 오래된 프로그래밍 언어에서 유사하다.  

### bounded variable

함수 호출의 컨텍스트에 의해 값이 결정되지 않는다.

## Python example

```python
def f():
    print(X)
```

`X`는 지역 변수가 아니다. 이 변수의 값은 `Python` 컨벤션을 따른다:  
체인 블록의 상위 단계에서 변수가 선언되었는지 찾는다. 없다면 한단계 상위 블록을 찾으면서 최상위 블록까지 탐색한다.  

만약 파이썬에서 변수 `X`가 함수 선언 컨텍스트에 의해 결정된다면, 우리는 `X`가 **bounded variable**이라고 부를 것이다.  

`X`가 **free variable**이라고 가정해보자. 10이 출력될 것이다:

```python
X = "glbal X"

def f():
    print(X)

def g():
    # X is a local variable to g(), shadowing the global `X`
    X = "local X"
    f()
```

파이썬에서, 이 코드는 "`global X`"를 출력한다. 그 이유는 `X`가 모두 종속되어있기 때문이다.  
지역 `g()`에 종속된 `X`는 지역 변수이고, `f()`는 전역 `X`에 종속되어있다. (`f()` 또한 전역에 종속되어 있다.)  

## 구현

프로그래밍 언어에서 **free variable**의 구현되려면 아래의 내용을 고려해야한다:

- 각 함수가 어느 컨텍스트에서 호출되었는지 관리할 필요가 있다.
- 모든 **free variable**의 값이 어떤 변수를 사용할 것인지를 찾기 위해 약간의 [`reflection`](https://en.wikipedia.org/wiki/Reflective_programming)을 사용할 필요가 있다. 

**free variable**은 컴파일 시간에 값이 결정되지 않고, 런타임 플로우 그리고 콜스택에 크게 의존한다.  

---

## Read more

- [what are free and bound variables](https://stackoverflow.com/questions/21855838/what-are-free-and-bound-variables)
- [묶인 등장과 자유 변수](https://hjaem.info/articles/kr_2011_0)
- [위키](https://ko.wikipedia.org/wiki/%EC%9E%90%EC%9C%A0_%EB%B3%80%EC%88%98%EC%99%80_%EC%A2%85%EC%86%8D_%EB%B3%80%EC%88%98)
- [반영 프로그래밍](https://ko.wikipedia.org/wiki/%EB%B0%98%EC%98%81_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99))