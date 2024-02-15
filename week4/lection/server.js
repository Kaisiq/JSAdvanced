const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

function handleGetRequest(req,res){
    if(req.headers['Content-type'] === 'text/html'){
        const parsedPath = path.parse(req.url);
        const fileName = parsedPath.name;
        fs.readFile(filename, function(err, data){
            if(err){
                if(err.code === 'ENOENT'){
                    notFoundHandler(req,res);
                    return;
                }
                errorHandler(req,res);
                return;
            }
            res.writeHead(200);
            res.write(fileBuffer);
            res.end();
        })
    }
}

function handlePostRequest(req,res){

}

function notFoundHandler(req,res){
    res.writeHead(404);
    res.write('not found');
    res.end();
}

function errorHandler(req,res){
    res.writeHead(500);
    res.write('error');
    res.end();
}

const methodHandlers = {
    GET: handleGetRequest,
    POST: handlePostRequest,
};

http.createServer(function serverHandler(req,res){
    const requestMethod = req.method.toUpperCase();
    const handler = methodHandlers[requestMethod] || notFoundHandler;
    handler(req,res);
});

server.listen(config.port,function(){
    console.log("Server is listening on port", config.port)
})