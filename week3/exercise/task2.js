// Използвайки класическо прототипно наследяване направете конструктор функция Circle, 
//която наследява функционалността на Point. Освен координатите 
//(които ще определят центъра на кръга), ще има и аргумент r`, определящ радиус на кръга.
// Да се реализират и методите:
    // getCircumference() - връща обиколката на кръга
    // getArea() - връща лицето на кръга
    // intersects(circle2) - проверява дали нашият кръг има сечение с подадения circle2



function Point(x, y){
    this.x = x;
    this.y = y;
}

var circleMethods = {
    getCircumference: function(){
        return this.r * 2 * Math.PI;
    },
    getArea: function(){
        return (this.r)*(this.r) * Math.PI;
    },
    intersects: function(circle2){
        resx = this.x - circle2.x;
        resy = this.y - circle2.y;
        resr = this.r + circle2.r;
        if(Math.abs(resx) <= resr || Math.abs(resy) <= resr){
            return true;
        }
        return false;
    }
}

function Circle(x,y,r){
    Point.call(this,x,y);
    this.r = r;
}


function copyObjectProps(source, target){
    target = target || {};
    for(var el in source){
        target[el] = source[el];
    }
    return target;
}

function mixin(){
    var target = copyObjectProps(arguments[0]);
    var len = arguments.length;
    for(var i=1; i<len; i++){
        var source = arguments[i];
        copyObjectProps(source,target);
    }
    return target;
}

circle1 = new Circle(3,5,1);
circle2 = new Circle(7,12,1);
extendedC1 = mixin(circle1, circleMethods);

console.log(extendedC1.getCircumference());
console.log(extendedC1.getArea());
console.log(extendedC1.intersects(circle2));
