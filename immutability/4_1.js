function fn(person) {
  person.name = 'lee';
}

var o1 = { name: 'kim' };
var o2 = Object.assign({}, o1);
fn(o2);
console.log(o1, o2, o1 === o2);
