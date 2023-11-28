#

## Класове

### ES5:

Създаваме обект чрез конструкторна функция:

```javascript
function Person(name, age) {
    Object.defineProperty(this, "name", {
        get() {
            return name;
        },
    });
    Object.defineProperty(this, "age", {
        get() {
            return age;
        },
    });
}
```

Добавяме методи към класа по следния начин:

```javascript
Person.prototype.somePersonFunctionality = function () {
    console(this.name, this.age);
};
```

Наследяване на класове:

```javascript
function Employee(name, age, position) {
    Person.call(this, name, age); // super(name, age);
    this.position = position;
}
```

Наследяване на методите на даден клас

```javascript
Employee.prototype = Object.create(Person.prototype); // extends Person

Employee.prototype.someEmployeeFunctionality = function () {
    console(this.name, this.age, this.position);
};
```

### ES6:

Създаваме клас по следния начин:

```javascript
class Person {
    #privateVar = 10;
    constructor(name, age) {
        Object.defineProperty(this, "name", {
            get() {
                return name;
            },
        });
        Object.defineProperty(this, "age", {
            get() {
                return age;
            },
        });
        this.#privateVar = 20;
    }
    somePersonFunctionality() {
        console(this.name, this.age);
    }
}
```

Наследяване на класове:

```javascript
class Employee extends Person {
    constructor(name, age, position) {
        super(name, age);
        this.position = position;
    }
    someEmployeeFunctionality() {
        console(this.name, this.age, this.position);
    }
}

const e = new Employee("a", 20, "a");
```

## Итериращи функции

### ES5

Правим функция с private променлива по която ще обхождаме:

```js
function iteratorFactory(iteratorData) {
    let counter = 0;
    return {
        next() {
            const completed = counter === iteratorData.length;
            if (completed) return { value: null, completed };
            const value = iteratorData[counter++];
            return { value, completed };
        },
    };
}

const iter = iteratorFactory([1, 2, 3]);
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
```

### ES6

Използваме `function*` и `yield`

`function*` - създава връзка с нова генераторна функция. Функцията може да бъде напускана и извиквана отново и отново, като контекста й се пази.

`yield` - оператор, който се използва за паузиране и продължаване на генераторна функция

```js
function* genFactory() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

const g = genFactory();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
```

Пример:

```js
function iteratorFactory(iteratorData) {
    return (function* () {
        let counter = 0;
        while (counter < iteratorData.length) {
            yield iteratorData[counter++];
        }
    })();
}

const iter = iteratorFactory([1, 2, 3]);
console.log(iter.next());
setTimeout(() => {
    console.log(iter.next());
    console.log(iter.next());
    console.log(iter.next());
}, 5000);
```

## Symbols

```js
// Global registry symbols
const s1 = Symbol.for("test");
const s2 = Symbol.for("test");

const obj = {
    [s1]() {
        console.log("Hello from my cool method");
    },
    regularMethod() {
        console.log("Hello from my not so cool method");
    },
};
obj.regularMethod();
obj["regularMethod"]();
obj[Symbol.for("test")]();

console.log(Object.keys(obj));
console.log(Object.getOwnPropertySymbols(obj));
```

```js
const a1 = Symbol("TEST");
const a2 = Symbol("TEST");

const a3 = "Test";
const a4 = "Test";

console.log(a1 === a2);

const obj2 = {
    a: 1,
    b: 2,
    c: 3,

    [Symbol.iterator]() {
        let counter = 0;

        const next = () => {
            const entries = Object.entries(this);
            const done = counter === entries.length;
            const value = entries[counter++];
            return { value, done };
        };

        return { next };
    },
};

for (const a of obj2) {
    console.log(a);
}

const myNewObj = { ...obj2 };
const myNewObjArray = [...obj2];
console.log(myNewObj, myNewObjArray);
```

```js
const obj = {
    a: 1,
    b: 2,
    c: 3,

    // [Symbol.iterator]: function* () {}
    *[Symbol.iterator]() {
        let entries = Object.entries(this);
        let counter = 0;
        while (counter !== entries.length) {
            yield entries[counter++]; //es6 operator
            entries = Object.entries(this);
        }
    },
};

// const iter = obj[Symbol.iterator]();
// console.log(iter.next());
// obj.d = 1000;

function* gen() {
    let counter = 0;

    while (true) {
        const newCounter = yield counter++;
        counter = typeof newCounter === "number" ? newCounter : counter;
    }
}

const iter = gen();
```

## Promises

Promise обектът репрезентира евентуалното завършване (или грешка) на асинхронна операция и нейната стойност.<br>
Пример:

```js
const fs = require("fs");

function readFile(filePath, options) {
    return new Promise((res, rej) => {
        fs.readFile(filePath, options, (err, data) => {
            if (err) return rej(err);
            res(data);
        });
    });
}

function writeFile(filePath, data, options) {
    return new Promise((res, rej) => {
        fs.writeFile(filePath, data, options, (err) => {
            if (err) return rej(err);
            res();
        });
    });
}
```

### .then(), .catch(), .finally()

.then(), .catch() и .finally() връщат Promise, затова можем да ги chain-ваме.<br>
Пример:

```js
readFile("test.txt", { encoding: "utf-8" })
    .then((data) => writeFile("test.txt", data.slice(0, -1) + " WORLD!"))
    .then(() => true)
    .catch((err) => {
        console.error(err);
        return false;
    })
    .then((success) => console.log(success ? "File successfully updated!" : "File not updated!"));
```

## Spread operator (...args)

```js
const data = [1, 2, 3, 4];

const b = function (a, b, c, d) {};
b(...data);

const data2 = [...data, 2, 3, 4];

const obj = { a: 1, b: 2, c: 3 };

const obj2 = { ...obj, d: 4 };
```

## Rest operator (...args)

```js
function test(...args) {
    console.log(args);
}

const obj5 = { a: 1, b: 2, c: 3 };

const { a, ...rest } = obj5;

const arr1 = [1, 2, 3];

const [firstElem, ...rest2] = arr1;
```
