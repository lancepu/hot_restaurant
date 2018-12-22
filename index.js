const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3000;

let tables = [];
let waitList = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", (req, res) => {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/tables", (req, res) => {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", (req, res) => {
  return res.json(tables);
});

app.get("/api/waitlist", (req, res) => {
  return res.json(waitList);
});

app.post("/api/tables", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  if (tables.length < 5) {
    console.log(tables);
    tables.push(newReservation);
    res.json(newReservation);
  } else {
    waitList.push(newReservation);
    res.send({ waitlist: true });
  }
});

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
