# use strict

[javascript.info 기본문법 요약](https://ko.javascript.info/javascript-specials#ref-560)

아래와 같이 사용할 수 있습니다.  

```js
'use strict'

...
```

`use strict` 표현은 *스크립트의 최상단* 혹은 *함수 본문 최상단*에 있어야 합니다.  
이 표현이 없어도 코드가 동작하는데 문제는 없습니다만, 모던한 방식이 아닌 옛날 방식으로 동작합니다.  

**하위 호환성**을 지키면서 동작합니다.  
(여기서 말하는 하위호환성이란, 오래된 자바스크립트의 동작방식을 의미합니다. 좀 더 낮은 퍼포먼스로 동작할 수 있다는 것을 의미합니다.)  

되도록 `use strict`를 적어주는 것이 좋습니다.  
그러나 `class`나 `module`방식을 이용한다면, 모던 자바스크립트를 사용하는 것이기 때문에 `use strict`가 자동으로 적용되니 생략해도 됩니다.  
하지만 그렇지 않다면 `use strict`를 붙이는 것을 권합니다.  

## Read more

- [javascript.info strict mode](https://ko.javascript.info/strict-mode)
- [하연 블로그](https://hayeon17kim.github.io/posts/corejs0203/)