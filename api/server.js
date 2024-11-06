const express = require("express");
const path = require("path");

const app = express();

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node.js server!" });
});

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

module.exports = app;
