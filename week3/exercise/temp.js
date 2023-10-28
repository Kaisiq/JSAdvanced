function Parent(name) {
    this.name = name;
  }
  
  Parent.prototype.sayHello = function() {
    console.log("Hello from " + this.name);
  };
  
  function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
  }
  
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
  Child.prototype.sayAge = function() {
    console.log("I'm " + this.age + " years old.");
  };
  
  var kid = new Child("Lucy", 8);
  kid.sayHello();
  kid.sayAge();