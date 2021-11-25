const arr = [
    {id: 15},
    {id: -1},
    {id: 3},
    {id: 12.2},
    {id: 0},
    {},
    {id: null},
    { id: NaN },
    { id: 'undefined' }
];

let invalidEntries = 0;

function isNumber(item) {
    return item && typeof item === 'number' && item !== 0;
}

const filteredById = arr.filter(item => {
    if (isNumber(item.id)) {
        return true;
    }
    invalidEntries++;
    return false;
});

console.log(filteredById);