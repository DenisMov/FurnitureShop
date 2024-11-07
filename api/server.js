const express = require("express");
const app = express();

app.get("/api/products", (req, res) => {
  console.log("Vercel");
  res.json(products); // припустимо, що `products` - це ваш масив із даними
});

module.exports = app;
