var bodyParser = require("body-parser");
const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});
require("./router/cropImage.router")(app);

var server;
var hostname = "localhost";
var port = 5000;

server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//
