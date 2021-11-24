# about prototype

[객체 모델의 세부사항](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Details_of_the_Object_Model)

`Javascript`는 클래스 기반이 아닌 `prototype`에 기초한 언어이다.  
이런 차이로 인해, 객체들의 계층 구조의 생성과 속성 및 상속을 어떻게 구현해야하는지가 덜 분명할 수 있다.  

## `Class based language` vs `Prototype based language`

### Class based langage

**Class**와 **Instance**에 대해 `Java`, `Cpp`같은 클래스 기반의 언어들은 이 개념들을 구별합니다.  

- Class
  - 특정 개체군을 특정 짓는 모든 속성들을 정의
  - 해당 객체군을 표현할 수 있는 특정 멤버를 지칭하는 것이 아닌, 보다 더 추상적인 것
    - 예를 들어, `직원`클래스는 직원들을 대표할 수 있다
- Instance
  - 클래스를 기반으로 실체화된 것.
    - 예를 들어, `빅토리아`는 특정 직원을 나타내는 `직원`의 인스턴스가 될 수 있다.  
  - 부모 클래스의 속성과 동일한 속성을 가짐.

### Prototype based langauge

`Javascript`같은 프로토타입 기반 언어들은 **Class**, **Instance**에 차이를 두지 않습니다.  
간단히 객체들을 가질 뿐입니다. `prototype` based language는 원형(prototype)의 객체 개념을 갖고 있습니다.  

하나의 객체는 새로운 객체를 생성했을 때, 초기 속성을 가질 수 있도록 하는 template로 사용됩니다.  
객체는 생성될 때 혹은 런타임에 자기 자신의 속성을 명시할 수 있습니다.  

추가적으로, 객체들은 또 다른 객체를 생성하기 위한 `prototype`으로 연관지어 질 수 있으며  
`prototype`으로 생성된 두번째 객체가 `prototype`인 첫번째 객체의 속성을 공유(혹은 접근)하는 것을 허용합니다.  
(`Python`은 프로토타입기반 언어가 아니다. [wiki-prototype-based_programming](https://en.wikipedia.org/wiki/Prototype-based_programming))  

## 클래스 정의

> `ECMAScript2015`에서 클래스선언이 포함되었으나, 이것이 새로운 객체 중심 상속 모델을 소개한 것은 아닙니다.  
> (표현 형태만 바뀌었다고 볼 수 있겠다.)

## 비교

### Java

1. 클래스 != 인스턴스
2. *클래스 정의*로 클래스를 생성, *생성자 메서드*로 인스턴스 생성.
3. `new` 연산자로 인스턴스 생성.
4. 이미 존재하는 클래스에 대한 하위 클래스를 정의, 객체의 계층구조를 생성.
5. 클래스의 상속 구조에 따라 속성을 상속.
6. *클래스 정의*는 모든 인스턴스의 속성을 명시.
   1. 동적으로 속성 추가할 수 없다.

### Javascript

1. 모든 객체는 다른 객체로부터 상속받음.
2. *생성자 함수*로 객체군을 정의 및 생성.
3. `new` 연산자로 인스턴스 생성.
4. 하나의 객체를 *생성자 함수*와 결합된 프로토타입에 할당함으로써, 객체의 계층구조를 생성.
   1. 모든 객체는 `prototype`에 결부되어있다.
5. `prototype` 체인에 따라 속성을 상속.
6. *생성자 함수* 혹은 `prototype`은 초기 속성들을 명시.
   1. 개별 혹은 전체 객체군에 동적으로 속성 추가/삭제 가능.

## 예시

![직원 객체의 계층 구조](./figure8.1.png)

```js
function Employee() {
    this.name = "";
    this.dept = "general";
}

function Manager() {
    Employee.call(this);
    this.reports = [];
}
Manager.prototype = Object.create(Employee.prototype);

```
