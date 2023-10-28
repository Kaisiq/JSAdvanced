// Създайте конструтор функция Point, която получва два аргумента: 
//x и y, описващи позицията на точката в пространството. 
//Да се реализират методите:
// getDistance(point2) - намира разтоянието между нашата точка и point2

var PointMethods = {
    getDistance: function(point2){
        xres = this.x - point2.x;
        yres = this.y - point2.y;
        return Math.sqrt(xres^2 + yres^2);
    }
}




function Point(x, y){
    this.x = x;
    this.y = y;
}

// Point.prototype.getDistance = function(point2){
    // xres = this.x - point2.x;
    // yres = this.y - point2.y;
    // return Math.sqrt(xres^2 + yres^2);
// };

var p1 = new Point(1,5);
var p2 = new Point(0,3);
// console.log(p1.getDistance(p2));
var extendedP1 = mixin(p1, PointMethods);
console.log(extendedP1.getDistance(p2));

// console.log(extendedP1.getDistance(p2));




function copyObjectProps(source, target){
    target = target || {};
    for(var el in source){
        target[el] = source[el];
    }
    return target;
}

function mixin(){
    var target = copyObjectProps(arguments[0]);
    for(var i=1; i < arguments.length; i++){
        var source = arguments[i];
        copyObjectProps(source, target);
    }
    return target;
}





