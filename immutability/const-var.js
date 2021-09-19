// 이름과 관련된 불변함

var v = 1;
// 1 억 줄의 코드

v = 2;
console.log('v : ', v);

const c = 1;
// 1억 줄의 코드

c = 2;
// TypeError: Assignment to constant variable.
console.log('c : ', c);
