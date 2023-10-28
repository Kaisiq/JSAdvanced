// Използвайки класическо прототипно наследяване направете конструктор функция RectanglePrism,
//която наследява функционалността на Rectangle. Освен входните данни на Rectangle,
//приема също и c, което описва третата стена на правоъгълната призма.
// Да се реализират и методите:
// getVolume() - връща обема на правоъгълната призма

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Rectangle(x, y, a, b) {
    Point.call(this, x, y);
    this.a = a;
    this.b = b;
}

Rectangle.prototype.getArea = function(){
    return this.a*this.b;
}

RectanglePrism.prototype = Object.create(Rectangle.prototype);

function RectanglePrism(x, y, a, b, c) {
    Rectangle.call(this,x,y,a,b);
    this.c = c;
}

RectanglePrism.prototype.getVolume = function(){
    var area = this.getArea();
    return area * this.c;
}

var a = new RectanglePrism(1,2,3,4,5);
console.log(a.getVolume());
