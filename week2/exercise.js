// Напишете фунцкия memoize, която запаметява изпълнените до момента 
//резултати на дадена функция, в зависимост от подадените аргументи. 
//Т.е. ако при подаване на същите аргументи, тя директно връща резултат.

var sum = function (x, y) { return x + y; }
var memSum = memoize(sum);
// console.log(memSum(2,3)); // пресмята, връща 5
// console.log(memSum(3,3)); // пресмята, връща 6
// console.log(memSum(2,3)); // директно връща 5 без да смята

function memoize(func){
    var cache = {};
    return (...args) => {
        key = JSON.stringify(args);
        if(cache[key] === undefined){
            console.log("Calculating");
            cache[key] = func(...args);
        }
        return cache[key];
    }
}


//2 Hапишете функция curry, която взима дадена функция f като аргумент и
// ни връща нова функция, чрез която частично можем да прилагаме f.
function trippleAdd(a, b, c) {
    return a + b + c;
}

const cTrippleAdd = curry(trippleAdd);

// console.log(cTrippleAdd(1)(2)(3)); //6
// console.log(cTrippleAdd(1, 2)(3)); //6
// console.log(cTrippleAdd(1, 2, 3)); //6


function curry(func, list = []){
    if(func.length <= list.length){
        return func(...list);
    }
    return (...args) =>{
        return curry(func, [...args, ...list]);
    } 
}


//3 Напишете функция compose която ни прави композиция от n на брой функции.
var addOne = (x) => x + 1;
var sqrt = (x) => x * x;
var log = (x) => console.log(x);

addOneSqrtAndPrint = compose(log, sqrt, addOne);

addOneSqrtAndPrint(1); // 4


function compose(){
    var lst = [].slice.call(arguments);

    return (arg) => {
        return lst.reduceRight((prev, curr) => 
        (...args) => curr(prev(args)), 
        (x) => x)(arg);
    }
}









