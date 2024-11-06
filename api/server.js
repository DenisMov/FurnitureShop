// api/server.js
const express = require("express");
const cors = require("cors"); // Підключаємо CORS
const app = express();

app.use(cors()); // Включаємо CORS для всіх маршрутів

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node.js server!" });
});

module.exports = app;
