const kvArray = [
    {key: 1, value: 10},
    {key: 2, value: 20},
    {key: 3, value: 30},
];

console.log(kvArray);

const reformattedArray = kvArray.map(function(item) {
const rItem = {};
    rItem[item.key] = item.value;
    return rItem;
});

console.log(reformattedArray);