// Използвайки класическо прототипно наследяване направете конструктор функция Circle,
//която наследява функционалността на Point. Освен координатите
//(които ще определят центъра на кръга), ще има и аргумент r`, определящ радиус на кръга.
// Да се реализират и методите:
// getCircumference() - връща обиколката на кръга
// getArea() - връща лицето на кръга
// intersects(circle2) - проверява дали нашият кръг има сечение с подадения circle2

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Circle(x, y, r) {
    Point.call(this, x, y);
    this.r = r;
}

Circle.prototype = Object.create(Point.prototype);


Point.prototype.printSvetlio = function(){
    return "svetlio";
}



Circle.prototype.getCircumference = function(){
    return this.r * 2 * Math.PI;
}

Circle.prototype.getArea = function(){
    return this.r * this.r * Math.PI;
}
Circle.prototype.intersects = function(circle2) {
    resx = this.x - circle2.x;
    resy = this.y - circle2.y;
    resr = this.r + circle2.r;
    if (Math.abs(resx) <= resr || Math.abs(resy) <= resr) {
        return true;
    }
    return false;
}

var c1 = new Circle(3,5,1);
var c2 = new Circle(7,9,1);
console.log(c2.printSvetlio());
console.log(c1.getCircumference());
console.log(c1.printSvetlio());
console.log(c1.intersects(c2));

Circle.prototype = Object.create(Point.prototype);
c3 = new Circle(1,2,3);
console.log(c3.printSvetlio());
console.log(c3.getArea());