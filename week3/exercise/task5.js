// Създайте mixin ColorMixin, който да има методи за задаване и взимане на цвят.
// Да се реализират методите:
    // setColor(color) - задава цвета
    // getColor() - връща зададения цвят или null, ако няма такъв
// След това "нанесете" този mixin върху констрктурите от по-горе.

function ColorMixin(color){
    this.color = color;
}

ColorMixin.prototype.setColor = function(color){
    this.color = color;
}

ColorMixin.prototype.getColor = function(){
    return this.color;
}

var colorsFuncs = {
    setColor: function(color){
        this.color = color;
    },
    getColor: function(){
        return this.color;
    }
}

var c1 = new ColorMixin("green");
c1.getColor();
c1.setColor("red");
c1.getColor();

var c2 = new ColorMixin("red");
console.log(c1.getColor === c2.getColor); // true
extendedC2 = mixin(c2, colorsFuncs);
console.log(extendedC2.getColor === c2.getColor); // false


function copyObjectProps(source, target){
    target = target || {};
    for(var el in source){
        target[el] = source[el];
    }
    return target;
}

function mixin(){
    var target = copyObjectProps(arguments[0]);
    for(var i=1; i<arguments.length; i++){
        copyObjectProps(arguments[i], target);
    }
    return target;
}

