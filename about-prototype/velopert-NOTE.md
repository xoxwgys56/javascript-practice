# velopert note

[velopert.prototype](https://learnjs.vlpt.us/basics/10-prototype-class.html)  

## 객체 생성자

```js
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

dog.say();
cat.say();
console.log(dog.sharedValue);
console.log(cat.sharedValue);
```