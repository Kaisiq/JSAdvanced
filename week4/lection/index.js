for(var i=0; i<5; ++i){
    setTimeout(function () {
        console.log(i); // 5 5 5 5 5
    });
}


for(var i=0; i<5; ++i){
    (function(j) {
        setTimeout(function (){
            console.log(j); // 0 1 2 3 4
        });
    }(i));
}










var v=1;
console.log(a);

// Object.defineProperties()
var obj = {};
Object.defineProperty(obj, 'a', {
    get(){
        return 100;
    },
    set(b){
        this.a = b;
    }
});

Object.defineProperty(obj, 'b', {
    value:1000,
    writable: false,
});

//ne se polzvat chesto, no e hubavo da gi znaem/razgledame



{
    const a = {prop1: 1}; //kazvame che *a* sochi v pametta samo kum tova i ne moje da sochi kum drugo
    //no mojem da promenim negovite atributi
    // let a = 10;// -> error
    a.prop1 = 10000; // moje da se smenq
}
{
    let a = 100;
}