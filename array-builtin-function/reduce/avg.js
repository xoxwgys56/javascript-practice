/**
 * References
 *  - [js multiple line string](https://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript)
 */

const avg = [1, 2, 3, 4, 5].reduce(
    (acc, cur, idx, arr) => {
        if (idx === arr.length -1) {
            console.log(`last accumulator is ${acc}, ` +
            `let's divide ${acc} by ${arr.length} for get average.`);

            return (acc + cur) / arr.length;
        }
        return acc + cur;
    }, 0
);

console.log(avg);