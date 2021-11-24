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
// global scope
var e = 10;
function sum(a) {
    return function(b) {
        return function(c) {
            // outer functions scope
            return function(d) {
                // local scope
                return a + b + c + d + e
            }
        }
    }
}

/** 
 * 아래와 같이 호출하는 것을 currying(커링)이라고 한다.
 * [javascript.info currying](https://ko.javascript.info/currying-partials)
*/
console.log(sum(1)(2)(3)(4)); // log 20

// 익명 함수 없이 작성할 수도 있다.

// global scope
var e = 10;
function sum(a) {
    return function sum2(b) {
        return function sum3(c) {
            // outer functions scope
            return function sum4(d) {
                // local scope
                return a + b + c + d + e;
            }
        }
    }
}

var s = sum(1);
var s1 = s(2);
var s2 = s1(3);
var s3 = s2(4);
console.log(s3); // log 20
```

위의 예제를 보면 일련의 중첩된 함수들을 볼 수 있다.  
이 함수들은 모두 외부 함수의 스코프에 접근할 수 있다. (상위 스코프에 접근할 수 있다.)  
이 컨텍스트에서는 모든 클로저가 선언된 외부 함수의 스코프에 접근한다고 말할 수 있다.  

## 루프에서 클로적 생성하기: 일반적인 실수

`let` 키워드가 없었을 때 클로저와 관련된 일반적인 문제는 루프 안에서 클로저가 생성되었을 때 발생한다:  

```html
<p id="help">Help</p>
<p>email:<input type="text" id="email" name="email" /></p>
<p>name:<input type="text" id="name" name="name" /></p>
<p>age:<input type="text" id="age" name="age" /></p>
<script>
    function showHelp(help) {
        document.getElementById("help").innerHTML = help;
    }

    function setupHelp() {
        var helpText = [
            {"id": "email", "help": "Your email address"},
            {"id": "name", "help": "Your full name"},
            {"id": "age", "help": "Your age"},
        ];

        for (var i=0; i<helpText.length; i++) {
            var item = helpText[i];

            // 아래의 할당된 함수는 for loop 내의 범위를 클로저로 갖고 있다.
            // loop가 동작하는 동안, item은 계속 새로 할당되는데 각각의 변화하는 item을 참조한다.
            document.getElementById(item.id).onfocus = function() {
                showHelp(item.help);
            }
        }
    }

    setupHelp();
</script>
```

위 코드를 사용하면 의도한대로 동작하지 않는다는 것을 알 수 있다.  
어떤 필드에 포커스를 주더라도 나이에 관한 도움말만 표시된다.  

`onfocus` 이벤트에 연결된 함수가 클로저이기 때문이다.  
이 클로저는 함수 정의와 `setupHelp` 함수 범위에서 캡처된 환경으로 구성된다.  
루프에서 세개의 클로저가 만들어졌지만, 각 클로저는 값이 변하는 변수가 (`item.help`) 있는 같은 `helpText` 리스트의 마지막 요소를 가리키고 있을 것이다.

이 경우 한가지 해결책은 더 많은 클로저를 사용하는 것이다: 특히 앞에서 설명한 함수 팩토리를 사용한다.

```js
function showHelp(help) {
    document.getElementById("help").innerHTML = help;
}

/**
 * 팩토리 함수역할을 하고 있다.
 * showHelp()의 help는 더 이상 loop 내의 item을 참조하지 않는다.
 * 
 * 반환되는 function 관점에서 help는 makeHelpCallback에 속하기 때문이다.
 * (아래부터 뇌피셜)
 * 그러므로 동적으로 할당된 help값을 참조하게 되는데, 참조하는 시점은 루프가 동작할 때이다.
 * (루프가 동작하는 시점에서 할당된다.)
*/
function makeHelpCallback(help) {
    return function() {
        showHelp(help);
    };
}

function setupHelp() {
    var helpText = [
        {"id": "email", "help": "Your email address"},
        {"id": "name", "help": "Your full name"},
        {"id": "age", "help": "Your age"},
    ];

    for (var i=0; ihelpText.length; i++) {
        var item = helpText[i];
        document.getElemtnById(item.id).onfocus = makeHelpCallback(item.help);
    }
}

setupHelp();
```

그 외에도 `익명 클로저` 혹은 `let` 키워드를 이용해서 해결할 수 있다.  
(이에 관한 예시 코드는 `/mistake-use-in-loop` 폴더에 포함했다.)  

## 성능 관련 고려사항

특정 작업에 클로저가 필요하지 않은데, 다른 함수 내에서 함수를 불필요하게 작성하는 것은 현명한 방법이 아니다.  
이것은 *속도*와 *메모리* 소비 측면에서 스크립트 성능에 부정적인 영향을 미칠 것이다.  

예를 들자면, 새로운 *객체*/*클래스*를 생성할 때, 메소드는 일반적으로 객체 생성자에서 정의되기보다는 객체의 프로토타입에 연결되어야 한다.  
그 이유는 생성자가 호출될 때마다 메소드가 다시 할당되기 때문이다. (인스턴스가 생성될 때마다, 메소드를 새로 할당하는 것이다.)  

해당 내용은 아래와 같다:

```js
// 생성자에서 메서드가 정의되었다.
function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
    this.getName = function() {
        return this.name;
    };
    this.getMessage = function() {
        return this.message;
    };
}
```

클로저를 제거하고, `프로토타입`을 사용하면 다음과 같이 작성할 수 있다:

```js
// 아래의 예시 코드에서 함수선언부를 생략했다.
function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
}

// use prototype
MyObject.prototype = {
    getName: function() {
        return this.name;
    },
    getMessage: function() {
        return this.message;
    }
};
```

그러나 `프로토타입`을 다시 정의하는 것은 권장되지 않음으로, 기존 프로토타입에 추가하는 것이 좋다:

```js
// ... 함수 선언 생략

// 기존 prototype에 추가한다.
MyObject.prototype.getName = function() {
    return this.name;
};
MyObject.prototype.getMessage = function() {
    return this.message;
};
```

좀 더 깔끔하게 작성해 보자:

```js
// ... 함수 선언 생략

(function() {
    this.getName = function() {
        return this.name;
    };
    this.getMessage = function() {
        return this.message;
    };
}).call(MyObject.prototype);
```

앞의 두가지 예제에서 상속된 프로토타입은 모든 객체에서 공유될 수 있으며, 메소드 정의는 모든 객체 생성시 발생할 필요가 없다.  

---

## Read more

- [객체모델의 세부 사항](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Details_of_the_Object_Model)
