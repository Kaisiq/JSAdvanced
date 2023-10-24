function getNaturalNumberGenerator() {
    // public function
    var counter = 0; // private variable
    return function () {
        // private function
        return counter++;
    };
}

var gen = getNaturalNumberGenerator;
console.log(gen());
console.log(gen());
console.log(gen());
console.log(gen());

function getThisClosure(a) {
    a = a || 0;
    function thisIsClosure() {
        a = a + 3;
        return b + 10;
    }
    var b = 30;
    return thisIsClosure;
}

function getnatnum(counter) {
    counter = counter || 0;
    return function natgen(fn) {
        if (fn) {
            counter = fn(counter);
        }
        return counter++;
    };
}

var gen2 = getnatnum(10);
console.log(
    gen2(function (test) {
        console.log(">>", test++);
        console.log(">>", test);
        return test;
    })
);
console.log(gen2());

function myFunction2(a, b) {
    console.log(this, a, b, arguments);
}

// myFunction2();
//call priema poveche argumenti
myFunction2.call("Hello from call", 1, 2, 3);
//apply priema spisuk ot stoinostite koito da budat slojeni na promenlivite
myFunction2.apply("Hello from apply", [1, 2, 3]);
// sushto priema argumenti
var myFunction3 = myFunction2.bind("Hello from bind", 1, 2);
myFunction3(5, 6, 3); // 1 i 2 zamazvat 5 i 6, 3 si ostava

var obj = {
    // (this) context =/= oblast na vidimost (promenlivi koito imame vuv funkciq)
    fun: myFunction2, //method
};
//funkciq si e funkciq
obj.fun(); //tova veche e method, zashtoto e chast ot obekt
myFunction2(); // globalen context

function myFun4(a, b) {
    console.log(this, a, b, arguments);
    var args = [].slice.call(arguments);
    console.log(Array.isArray(args), args);
}
