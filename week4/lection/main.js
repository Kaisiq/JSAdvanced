var fs = require("fs");

// var file = fs.readFileSync('index.js');
// var file2 = fs.readFileSync('index.js', {encoding: 'utf8'});
// console.log(file.toString());

// fs.writeFileSync('test.txt', 'hello world!');


fs.readFile('index.js', {encoding: 'utf8'}, function afterRead(error, data){
    if(error){
        console.error(error);
        return;
    }

    var result = data.split('\n');
    console.log(result.length);

    fs.writeFile('lines-count', result.length.toString(), function(err){
        if(err){
            console.log(err);
            return;
        }
        console.log("saved");
    });
});
console.log("hello");