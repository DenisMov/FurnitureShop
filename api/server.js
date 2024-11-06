// api/server.js
const express = require("express");
const app = express();

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Node.js server!" });
});

// Експортуємо `app`, щоб Vercel міг використовувати його як обробник
module.exports = app;
