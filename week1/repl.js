var myString = "Hell World";

myString += "Poe";
console.log(myString);

var myNumber = 4;
console.log(myNumber);

myString = myNumber;
console.log(myString, myNumber);

var myBool = true;
var myBool2 = false;

var myNull = null;
var myUndef = undefined;
var falseyNan = NaN;
falseyNan != NaN; //interesno

function sum(a, b) {
  return a + b;
}

console.log(sum(5, "13"));

var num = 4.123123123412512362; // ne e obekt, no e box-nata stoinost 
//koqto stava obekt ot tip number
num.toFixed(2);

var obj = {
  prop1: 100,
  prop2: 200
};

for (var i in obj){
  console.log(i)
  console.log(obj[i])
}


function sumElementsOfArr(obj){
  var sum = 0;
  for (var a in obj){
    sum += obj[a];
  }
  return sum;
}

function sum(a,b){
  var sum = 0;
  if(a instanceof Array || (typeof a === 'object' && a !== null)){
    sum += sumElementsOfArr(a);
  }
  else {
    sum += a;
  }
  if(b instanceof Array || (typeof b === 'object' && b !== null)){
    sum += sumElementsOfArr(b);
  }
  else {
    sum += b;
  }

  return sum;
}