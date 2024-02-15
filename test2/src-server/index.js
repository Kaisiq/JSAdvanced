const express = require("express");
const cors = require("cors");
const psList = require("ps-list");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const bodyParser = require("body-parser");

io.on("connection", function (socket) {
    console.log("a user connected");
    // setTimeout(() => io.send("sample message"), 1000);

    socket.on("disconnect", function () {
        console.log("user disconnected");
    });

    socket.on("start-polling", function (id) {
        console.log("start-polling", id);
        intervalId = setInterval(async () => {
            const processes = await checkProcess();
            const targetProcess = findProcess(processes, id);
            // console.log(targetProcess);
            if (targetProcess) {
                socket.emit("message", targetProcess);
            }
        }, 1000);
    });
    socket.on("stop-polling", function () {
        console.log("stop-polling");
        // ...
        clearInterval(intervalId);
    });
});

function findProcess(processes, id) {
    let found = undefined;
    processes.forEach((el) => {
        if (el.pid == id) {
            found = el;
        }
    });
    return found;
}

async function checkProcess() {
    const data = await psList();
    return data;
}
checkProcess();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 8082;
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
