const fruits = ["apple", "banana", "grapes", "mango"];

function filterItems(query) {
    return fruits.filter(
        el => el.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
}

console.log(filterItems("ap"));
console.log(filterItems("an"));