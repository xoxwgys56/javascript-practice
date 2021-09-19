/**
 * variable-comparison
 */

var p1 = 1;
var p2 = 1;
console.log(p1, p2, p1 === p2);
// 1 1 true
// variable only compare its value

var o1 = { name: 'kim' };
var o2 = { name: 'kim' };
console.log(o1, o2, o1 === o2);
// { name: 'kim' } { name: 'kim' } false
// object's own value is same but they compare its address

var o3 = o1;
o3.name = "lee";
console.log(o1, o3, o1 === o3);
// { name: 'lee' } { name: 'lee' } true
// this case `o3` is reference of `o1`. not copied new object.