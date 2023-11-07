const http = require('http');
const fs = require('fs');

const config = require('./config.json');

function handleGetRequest(req,res){

}

function handlePostRequest(req,res){

}

function notFoundHandler(req,res){
    res.writeHead(404);
    res.write('not found');
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