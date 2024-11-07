const express = require("express");
const cors = require("cors"); // додайте цей рядок
const app = express();

app.use(cors()); // додайте цей рядок

const products = [
  {
    id: 1,
    title: "The Dandy chair",
    description:
      "Lorem ipsum dolor sit amet, git consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    price: 50,
    image: "/assets/images/1.jpg",
    productType: "Furniture",
    designer: "Robert Smith",
  },
  {
    id: 2,
    title: "The Dandy chair",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    price: 70,
    image: "/assets/images/2.jpg",
    productType: "Homeware",
    designer: "Robert Smith",
  },
  {
    id: 3,
    title: "The Dandy chair",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    price: 150,
    image: "/assets/images/3.jpg",
    productType: "Sofas",
    designer: "Liam Gallagher",
  },
  {
    id: 4,
    title: "The Dandy chair",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    price: 250,
    image: "/assets/images/4.jpg",
    productType: "Light fittings",
    designer: "Biggie Smalls",
  },
  {
    id: 5,
    title: "The Dandy chair",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    price: 250,
    image: "/assets/images/5.jpg",
    productType: "Accessories",
    designer: "Thom Yorke",
  },
  {
    id: 6,
    title: "The Dandy chair",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    price: 250,
    image: "/assets/images/6.jpg",
    productType: "Homeware",
    designer: "Thom Yorke",
  },
  {
    id: 7,
    title: "The Dandy chair",
    description: "Comfortable and stylish chair perfect for your living room",
    price: 250,
    image: "/assets/images/7.jpg",
    productType: "Homeware",
    designer: "Robert Smith",
  },
  {
    id: 8,
    title: "The Dandy chair",
    description: "Comfortable and stylish chair perfect for your living room",
    price: 250,
    image: "/assets/images/8.jpg",
    productType: "Accessories",
    designer: "Biggie Smalls",
  },
  {
    id: 9,
    title: "The Dandy chair",
    description: "Comfortable and stylish chair perfect for your living room",
    price: 250,
    image: "/assets/images/9.jpg",
    productType: "Sofas",
    designer: "Biggie Smalls",
  },
  {
    id: 10,
    title: "The Dandy chair",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    price: 150,
    image: "/assets/images/3.jpg",
    productType: "Furniture",
    designer: "Liam Gallagher",
  },
];

app.get("/api/products", (req, res) => {
  res.json(products);
});

module.exports = app;
