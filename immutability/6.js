var o1 = { name: 'kim', score: [1, 2, 3] };
Object.freeze(o1);
Object.freeze(o1.score);
o1.name = 'lee';
o1.city = 'seoul';
o1.score.push(4);
console.log(o1);
