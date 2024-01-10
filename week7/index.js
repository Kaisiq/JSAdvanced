const express = require("express");
const bodyParser = require("body-parser");
const port = 5000;
const app = express();

const map = new Map();
let id = 0;

app.use(bodyParser());

app.post("/event", (req, res) => {
    const { name, capacity } = req.body;
    map.set(id++, { name, capacity });
    res.writeHead(200).send({ event: map.get(id - 1), id: id - 1 });
});

app.get("/event/:id", (req, res) => {
    try {
        let toGet = Number(req.params.id);
        if (map.get(toGet) === undefined) {
            throw new Error("asd");
        }
        res.writeHead(200).send({ event: map.get(toGet) });
    } catch (err) {
        console.log(err);
        res.writeHead(400);
        res.send("Error: Cannot get event");
    }
});

app.delete("/event:id", (req, res) => {
    let toGet = Number(req.params.id);
    try {
        let toReturn = map.get(toGet);
        map.delete(toGet);
        res.json(toReturn);
    } catch (err) {
        console.log(err);
        res.writeHead(400);
        res.send("Error: cant delete");
    }
});

app.post("/event/:id/booking", (req, res) => {
    const { first, last } = req.body;
    let toGet = Number(req.params.id);
    let event = map.get(toGet);
    if (event.capacity < 1) {
        res.writeHead(400).send("Error: no more capacity");
    }
    event.capacity--;
    event.guests = event.guests || [];
    event.guests.push({ first, last });
    res.writeHead(200).send({ capacity: event.capacity });
});

app.get("/event/:id/booking", (req, res) => {
    let toGet = Number(req.params.id);
    let event = map.get(toGet);
    if (event === undefined) {
        res.writeHead(404).send("Err: not found");
    }
    res.writeHead(200).send({ guests: event.guests });
});

app.get("/event/:id/booking/:bookingid", (req, res) => {
    let toGet = Number(req.params.id);
    let guestId = Number(req.params.bookingid);
    let event = map.get(toGet);
    if (event === undefined) {
        res.writeHead(404).send("Err: not found");
    }
    if (event.guests[guestId] === undefined) {
        res.writeHead(404).send("Err: guest not found");
    }
    res.writeHead(200).send({ guest: event.guests[guestId] });
});

app.delete("/event/:id/booking/:bookingid", (req, res) => {
    let toGet = Number(req.params.id);
    let guestId = Number(req.params.bookingid);
    let event = map.get(toGet);
    if (event === undefined) {
        res.writeHead(404).send("Err: not found");
    }
    if (event.guests[guestId] === undefined) {
        res.writeHead(404).send("Err: guest not found");
    }
    event.guests = event.guests.slice(0, guestId - 1).concat(event.guests.slice(guestId + 1));
    event.capacity++;
    res.writeHead(200).send({ event: event });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
