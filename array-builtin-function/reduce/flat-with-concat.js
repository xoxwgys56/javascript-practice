const nestedArr = [[0, 1], [2, 3], [4, 5]];

const flatted = nestedArr.reduce(
    (acc, cur) => acc.concat(cur), []
);
console.log(flatted);

// get sum of nested array. look bad.
const sum = nestedArr.reduce(
    (acc, cur) => {
        // acc is not always list type. so replace acc, cur
        acc = cur.concat(acc).reduce((acc, cur) => acc + cur);
        return acc;
    }
);
console.log(sum);

// console.log([1, 2, 3].concat(-1));

// get sum of nested array. look more better
const sum2 = nestedArr.reduce(
    (acc, cur) => acc.concat(cur)
).reduce((acc, cur) => acc + cur);
console.log(sum2);