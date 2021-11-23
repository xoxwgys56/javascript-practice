# first class object

[_First-class citizen_](https://en.wikipedia.org/wiki/First-class_citizen)으로 불리기도 한다.  

## 일급 객체

[wiki 일급 객체](https://ko.wikipedia.org/wiki/%EC%9D%BC%EA%B8%89_%EA%B0%9D%EC%B2%B4)

다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체.  
여기서 말하는 _일반적으로 적용 가능한 연산이란_, 함수에 매개변수로 넘기기, 수정하기, 변수에 대입하기와 같은 연산을 지원하는 것을 의미한다.  

## 역사

1960년대의 크리스토퍼 스트래치는 `ALGOL`(Algorithm Language) 언어의 *real number*와 *procedure*(function)을 비교함으로써 일급 및 이급 객체의 개념에 대해 처음으로 언급했다.  

> **first-class object**와 **second-class object**. `ALGOL`에서 *real number*는 표현식에 사용하거나 변수에 할당할 수 있으며, *procedure*에 매개변수로 넘겨질 수 있다.  
> 하지만 *procedure*의 경우 *procedure call*(function call)에서 호출 대상 혹은 매개 변수로 등장할 수 있을 뿐이며, *procedure*를 반환하는 *procedure*는 없다.  
>
> 이런 측면에서 `ALGOL`에서 *procedure*는 **second-class object**이다.  
> 언제나 직접 나타나야 하며, 변수나 연산식으로 대신 나타낼 수 없기 때문이다. (except in the case of a formal parameter) [see more](https://en.wikipedia.org/wiki/First-class_citizen#cite_note-4)

[*로빈 포플스톤*](https://en.wikipedia.org/wiki/Robin_Popplestone)은 **first-class object**를 구성하는 요소는 기본적인 권리가 있다는, 다음의 정의를 내렸다.  

1. 함수의 실제 매개변수가 될 수 있다.
2. 함수의 변환 값이 될 수 있다.
3. 할당 명령문의 대상이 될 수 있다.
4. 동일 비교의 대상이 될 수 있다.

이후 90년대에 **third-class object**에 대한 정의 제안했으나, 널리 받아들여지진 않았다.

## 예시

정수, 실수처럼 가장 간단한 스칼라 자료형은 대부분 일급 객체.  
`Javascript`의 경우 Closure는 일급 함수에 들어간다.  

---

## NOTE

잘모르겠다. 완전히 이해하지 못했다. 그러나 어떤 데이터형이 **first-class object**가 될 수 있는지에 대해서만 관심을 가지면 될 것 같다.  
60년대에는 **function**은 일급 객체가 될 수 없다고 생각했지만, 현대에는 그렇지 않다.  
