const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

const productsData = [
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

const users = [];
const orders = [];

app.post("/orders", (req, res) => {
  try {
    console.log("200");
    orders.push(req.body);
    return res.status(201).json({ message: "Order has been posted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/orders", (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: "UserID is required" });
  }

  try {
    const userOrders = orders.filter((order) => order.userId === userId);

    const modifiedData = userOrders.map((order) => ({
      cartProducts: order.cartProducts,
      date: order.date,
      cartTotal: order.cartTotal,
    }));

    res.status(200).json(modifiedData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/products", (req, res) => {
  res.json(productsData);
});

app.post("/register", (req, res) => {
  try {
    const { id, username, password, email } = req.body;

    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    users.push({ id, username, password, email });
    res.status(201).json({ id, username });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", (req, res) => {
  console.log(users);

  try {
    const { username, password } = req.body;
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      res.status(200).json({ id: user.id, username });
    } else {
      res.status(401).json({ error: "Incorrect username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
