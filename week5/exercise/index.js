import { file } from "bun";

const http = require('http');
const path = require('path');
const fs = require('fs');
const { Transform } = require('stream');

function transformText(dictionary, targetString) {
    dictionary.forEach((el, key) => {
        targetString = targetString.replaceAll("{{"+key+"}}", el);
    });
    return targetString;
  }
  
  const transformStream = new Transform({
    encoding: 'utf8',
    transform(chunk, encoding, cb) {
      const chunkString = chunk.toString();
      if (chunkString.includes('\n')) {
        const lines = (this.buffer + chunkString).split('\n');
        this.buffer = lines.slice(-1)[0];
        const rest = lines.slice(0, -1).concat(['']);
        let transformed = [];
        for (let i = 0; i < rest.length; i++) {
          const currentLine = rest[i];
          transformed = transformed.concat(transformText(replacementMap, currentLine));
        }
        const transformedText = transformed.join('\n');
        // this.push(transformedText);
        // cb();
        return cb(null, transformedText);
      }
      this.buffer = (this.buffer || '') + chunkString;
      cb();
    }
  });

function handleGETRequest(req, res){
    const parsedText = path.parse(req.url === "/" ? 'index.html' : req.url);
    let pageName = parsedText.name.split('?')[0] + ".txt";
    let dir = parsedText.dir.slice(1);
    pageName = dir+"/"+pageName;

    const dictionary = new URLSearchParams(req.url.split('?')[1] ?? "");

    fs.readFile(pageName, {encoding: "utf-8"}, function (err, fileBuffer) {
        if (err) {
          if (err.code === 'ENOENT') {
            notFoundHandler(req, res);
            return;
          }
          serverErrorHandler(req, res);
          return;
        }

        dictionary.forEach((el, key) => {
            fileBuffer = fileBuffer.replaceAll("{{"+key+"}}", el);
        });

        res.writeHead(200);
        res.write(fileBuffer);
        res.end();
      });
}

function notFoundHandler(req, res) {
    res.writeHead(404);
    res.write('Not found!')
    res.end();
}

  function serverErrorHandler(req, res) {
    res.writeHead(500);
    res.write('Server error!');
    res.end();
}


const server = http.createServer(function serverHandler(req,res){
    const requestMethod = req.method.toUpperCase();
    const handler = requestMethod === "GET" ? handleGETRequest : notFoundHandler;
    handler(req,res);
});

server.listen(8080,function(){
    console.log("Server is listening on port: " + 8080);
});