// Използвайки класическо прототипно наследяване направете конструктор функция Rectangle, 
//която наследява функционалността на Point. 
//Освен координатите (които ще определят долният ляв ъгъл на правоъгълника), 
//ще има и аргументи a и b, определящи двете дължини на страни на правоъгълника.
// Да се реализират и методите:
    // getPerimeter() - връща периметъра на правоъгълника
    // getArea() - връща лицето на правоъгълника
    // getLengthOfDiagonals() - връща масив от дължините на двата диагонала
    // getBiggestCircle() - връща кръга с най-голям възможен радиус и с начало центъра на правоъгълника

function Point(x, y){
    this.x = x;
    this.y = y;
}

function Rectangle(x, y, a, b){
    Point.call(this,x,y);
    this.a = a;
    this.b = b;
}

function Circle(x, y, r) {
    Point.call(this, x, y);
    this.r = r;
}


Rectangle.prototype.getPerimeter = function(){
    return 2*this.a + 2*this.b;
}
Rectangle.prototype.getArea = function(){
    return this.a*this.b;
}
Rectangle.prototype.getLengthOfDiagonals = function(){
    return Math.sqrt(this.a^2 + this.b^2);
}
Rectangle.prototype.getBiggestCircle = function(){
    circleX = this.x + this.a/2;
    circleY = this.y + this.b/2;
    circleR = this.b <= this.a ? this.b/2 : this.a/2;
    return new Circle(circleX,circleY,circleR);
}

rect = new Rectangle(3,4,5,6);
console.log(rect.getPerimeter());
console.log(rect.getArea());
console.log(rect.getLengthOfDiagonals());
console.log(rect.getBiggestCircle());