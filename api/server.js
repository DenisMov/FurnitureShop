const express = require("express");
const app = express();

app.get("/api/products", (req, res) => {
  res.json(products); // припустимо, що `products` - це ваш масив із даними
});

module.exports = app;
