# velopert note

[velopert.prototype](https://learnjs.vlpt.us/basics/10-prototype-class.html)  

## 객체 생성자

```js
// NOTE class와 유사하게 생겼지만, class 키워드를 사용하지 않고 있습니다.

function Animal(type, name, sound) {
    this.type = type;
    this.name = name;
    this.sound = sound;
    this.say = function() {
        console.log(this.sound);
    };
}

const dog = new Animal("dog", "happy", "wah");
const cat = new Animal("cat", "nabi", "mya-ong");

dog.say(); // wah
cat.say(); // mya-ong
```

위 코드를 보면, `dog`와 `cat`이 갖고 있는 `say()`가 동일한 코드이지만  
객체가 `new` 키워드로 생성될 때마다 함수도 새로 만들어져서 `this.say`로 설정되고 있는 것을 알 수 있습니다.  

## 프로토타입

아래 코드처럼 프로토타입에서 속성값을 설정할 수 있습니다.   

```js
<class-name>.prototype.<property-name> = <data-value>
```

이에 대한 예시:

```js
function Animal(type, name, sound) {
    this.type = type;
    this.name = name;
    this.sound = sound;
}

Animal.prototype.say = function() {
    console.log(this.sound);
};
Animal.prototype.sharedValue = 1;

const dog = new Animal("dog", "happy", "wah");
const cat = new Animal("cat", "nabi", "mya-ong");

dog.say(); console.log(dog.sharedValue); // wah 1
cat.say(); console.log(cat.sharedValue); // mya-ong 1
```

## Class

`ES6`부터 `class` 키워드를 이용할 수 있습니다. 위에서 객체 생성자로 구현했던 코드를 조금 더 명확하고, 깔끔하게 작성할 수 있습니다.  

```js
class Animal {
    constructor(type, name, sound) {
        this.type = type;
        this.name = name;
        this.sound = sound;
    }

    // Method
    say() {
        console.log(this.sound);
    }
}

// 인스턴스 생성 및 로그 출력 생략.
```

### 상속

```js
// Animal class 생략

class Dog extends Animal {
    constructor(name, sound) {
        super("dog", name, sound);
    }
}

class Cat extends Animal {
    constructor(name, sound) {
        super("cat", name, sound);
    }
}

// 인스턴스 생성 및 로그 출력 생략.
```

`super` 키워드로 부모 생성자를 호출하는 것을 알 수 있습니다.  
