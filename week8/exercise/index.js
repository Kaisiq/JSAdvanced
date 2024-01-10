// Имплементирайте собствена реализация на Promise като използвате nodejs http модула,
// която има същия интерфейс като оригиналната библиотека.

// Библиотеката трябва да има възможност да рутира заявки спрямо
//типа на заявката POST, GET, PUT, DELETE и пътя на заявката.
//Също така трябва да имаме възможност да слагаме middleware-и, които да обработват
//заявката в зависимост от къде са поставени, преди тя да отиде в конкретния handler
//за дадения път (използвайте path-to-regex модула от npm за да може лесно да
//преобразувате path стринг да регулярен израз, който да изпразвате при рутирането на заявките).

// Може да ползвате кода от лекцията миналата събота за да тествате вашата имплементация на експрес.
import { myPromise } from "./mypromise";
const fs = require("fs");

function readFile(filePath, options) {
    return new myPromise((res, rej) => {
        fs.readFile(filePath, options, (err, data) => {
            if (err) return rej(err);
            res(data);
        });
    });
}

function writeFile(filePath, data, options) {
    return new myPromise((res, rej) => {
        fs.writeFile(filePath, data, options, (err) => {
            if (err) return rej(err);
            res();
        });
    });
}

// [1].map(x => x + 1).map(x => x + 2) //sync
readFile("test.txt", { encoding: "utf-8" })
    .then((data) => writeFile("test.txt", data.slice(0, -1) + " WORLD!"))
    .then(() => true)
    .catch((err) => {
        console.error(err);
        return false;
    })
    .then((success) => console.log(success ? "File successfully updated!" : "File not updated!"));

// spread operator
const data = [1, 2, 3, 4];

const b = function (a, b, c, d) {};
b(...data);

const data2 = [...data, 2, 3, 4];

const obj = { a: 1, b: 2, c: 3 };

const obj2 = { ...obj, d: 4 };

// rest operator
function test(...args) {
    console.log(args);
}

const obj5 = { a: 1, b: 2, c: 3 };

const { a, ...rest } = obj5;

const arr1 = [1, 2, 3];

const [firstElem, ...rest2] = arr1;
