/**
 * 만약 ECMA-262 표준 제5판이 지원되지 않는 javascript라면 아래의 코드로
 * `filter`함수를 대체할 수 있다.
 * 
 * [폴리필](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#%ED%8F%B4%EB%A6%AC%ED%95%84)
 */

Array.prototype.filter = function(func, thisArg) {
    "use strict"
    /** 
     * local scope
     * this = Array
    */
    
    // if not callback function is not typeof 'function'
    if ( !((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError(`expect function type. but got ${typeof func} type.`);

    // [unsigned right shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift)
    var len = this.length >>> 0,
        res = new Array(len), // preallocate array. 
        t = this, c = 0, i = -1;

    console.log(`this=${t}, len=${len}, type=${typeof this}`);
    
    if (thisArg === undefined) {
        console.log(`undefined arg`);
        while( ++i !== len) {
            // check to see if the key was set
            console.log(`t[i]=${t[i]}, i=${i}`);
            if ((i in this) && func(t[i], i, t))
                res[c++] = t[i];
        }
    }
    else {
        console.log(`defined arg=${thisArg}`);
        while(++i !== len) {
            // check to see if the key was set
            if ((i in this) && func.call(thisArg, t[i], i, t))
                res[c++] = t[i];
        }
    }

    // 배열 크기를 적정 사이즈로 줄인다.
    res.length = c;
    return res;
};

const arr = [1, 2, 3, 4, 5, 6, 7];

console.log(`result is ${arr.filter(x => x%2 == 0)}`);
try {
    // expect type error
    console.log(arr.filter(3));
} catch (error) {
    console.log(error);
}