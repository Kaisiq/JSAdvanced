const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const bodyParser = require("body-parser");

let connectedSockets = [];

let messages = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set("view engine", "ejs");

io.on("connection", (socket) => {
    connectedSockets = connectedSockets.concat(socket);

    socket.emit("request-username");
    let username = "";

    socket.on("entered-username", (newUsername) => {
        username = newUsername;
        socket.emit("render");
        messages.forEach((message) => {
            socket.emit("chat-message", message);
        });
    });

    // setInterval(() => {
    //     socket.emit("system-message", "Hello from server");
    // }, 2000);

    socket.on("chat-message", (message) => {
        messages.push(username + "> " + message);
        io.emit("chat-message", username + "> " + message);
    });

    socket.on("disconnected", () => {
        connectedSockets = connectedSockets.filter((s) => s !== socket);
        username = "";
    });
});

server.listen(8080, () => {
    console.log("Server is listening on :8080");
});
