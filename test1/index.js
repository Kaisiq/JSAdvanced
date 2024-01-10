const fs = require("fs");

const writeStream = fs.createWriteStream("./test.txt", {
    encoding: "utf8",
    highWaterMark: 10,
});

const data = {
    stream1:
        "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    stream2:
        "LOREM IPSUM DOLOR SIT AMET CONSECTETUR ADIPISCING ELIT SED DO EIUSMOD TEMPOR INCIDIDUNT UT LABORE ET DOLORE MAGNA ALIQUA",
};

/*

  Task 1.
  Implement a PushStream class.
    - the idea is that 
  

*/

function PushStream(chunkSize, streamName) {
    this.dataStream = data[streamName] || "";
    this.chunkSize = chunkSize;

    this.isRunning = false;

    this.listeners = {
        data: null,
        end: null,
    };
}

PushStream.prototype.on = function (event, callback) {
    // Attach an event listener to the stream.
    // The only two events we care about are "data" and "end"
    // ...
    if(event === "data" || event === "end"){
        this.listeners[event] = (this.listeners[event] || []).concat(callback);
    }
    //dont care if not one of these
};

PushStream.prototype.pipe = function (destination) {
    // destination is a Writable stream
    // meaning it has `write` and `end` methods, which we need to use to "pipe" the data
    // destination.write(chunk);
    // destination.end();
    //...
    if(this.chunkSize > 0){
        destination.write(this.dataStream);
    }
    else{
        destination.end();
    }
    

};

PushStream.prototype.startReading = function () {
    if (!this.listeners.data || this.isRunning) {
        return;
    }

    this.isRunning = true;
    let currentSliceStart = 0;
    let currentSliceEnd = this.chunkSize;
    const intervalFunction = function () {
        // this function will be called every second and will read the next chunk
        // when the whole thing is done don't forget to clear the interval and "end"!

        // ...
        let currentSlice;
        if(currentSliceEnd >= this.dataStream.length + this.chunkSize){
            this.listeners.end.forEach(function (listener){
                listener();
            });
            return;
        }
        else if(currentSliceEnd >= this.dataStream.length){
            currentSlice = this.dataStream.slice(currentSliceStart);

        }
        else{
            currentSlice = this.dataStream.slice(currentSliceStart, currentSliceEnd);
        }

        currentSliceStart += this.chunkSize;
        currentSliceEnd += this.chunkSize;
        this.listeners.data.forEach(function (listener) {
            listener(currentSlice);
        });

        // ...
    }.bind(this);
    const interval = setInterval(intervalFunction, 1000);
};

const pushStreamReader = new PushStream(10, "stream1");
pushStreamReader.on("data", function (chunk) {
    console.log(chunk);
});

pushStreamReader.on("end", function () {
    console.log("<done reading>");
});

pushStreamReader.pipe(writeStream);

pushStreamReader.startReading();





















/*

  ------------------------------------------------------

  Bonus Task.
  Implement a PullStream class.

*/

function PullStream(chunkSize, streamName) {
    this.dataStream = data[streamName] || "";
    this.chunkSize = chunkSize;
    this.done = false;
}

PullStream.prototype.read = function () {
    // reads the next chunk of data from the stream
    // returns data in the following format: `{ done: boolean, data: string }`
    // data contains the next chunk of data
    // done is true when the stream is finished
    // ...

    var countStart = countStart || 0;
    var toPrint;
    var countEnd = countStart + this.chunkSize;
    var dataEnd = this.dataStream.length;
    if(countEnd >= dataEnd + this.chunkSize){
        this.done = true;
        toPrint = null;
    }
    else{
        toPrint = this.dataStream.slice(countStart,countEnd);
        countStart += this.chunkSize;
    }
    var toReturn = {data: toPrint, done: this.done};
    return toReturn;
};

const pullStreamReader = new PullStream(20, "stream2");

console.log(pullStreamReader.read()); // logs: { data: "smt smt smt", done: false }
console.log(pullStreamReader.read()); // logs: { data: "smt smt smt", done: false }
console.log(pullStreamReader.read()); // logs: { data: "smt smt smt", done: false }
console.log(pullStreamReader.read()); // logs: { data: "smt smt smt", done: false }
console.log(pullStreamReader.read()); // logs: { data: null, done: true }
console.log(pullStreamReader.read()); // logs: { data: null, done: true }
console.log(pullStreamReader.read()); // logs: { data: null, done: true }
