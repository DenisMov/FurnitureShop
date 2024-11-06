const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");
const serviceAccount = require(path.resolve(
  __dirname,
  "config",
  "serviceAccountKey.json"
));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/assets", express.static(path.join(__dirname, "../public/assets")));

const port = 3001;

app.get("/products", async (req, res) => {
  try {
    const productType = req.query.productType;
    const productsRef = db.collection("products");

    let snapshot;
    if (productType) {
      snapshot = await productsRef
        .where("productType", "==", productType)
        .get();
    } else {
      snapshot = await productsRef.get();
    }

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const usersRef = db.collection("users");

    const userSnapshot = await usersRef.where("username", "==", username).get();
    if (!userSnapshot.empty) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUserRef = await usersRef.add({ username, password, email });
    res.status(201).json({ id: newUserRef.id, username });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

app.post("/orders", async (req, res) => {
  try {
    const order = req.body;
    const ordersRef = db.collection("orders");
    await ordersRef.add(order);
    res.status(201).json({ message: "Order has been posted" });
  } catch (error) {
    res.status(500).json({ message: "Error posting order", error });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ message: "UserID is required" });
    }

    const ordersRef = db.collection("orders");
    const snapshot = await ordersRef.where("userId", "==", userId).get();
    const userOrders = snapshot.docs.map((doc) => doc.data());

    res.status(200).json(userOrders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});
async function loadProductsData() {
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

  const productsRef = db.collection("products");
  for (const product of productsData) {
    await productsRef.doc(product.id.toString()).set(product);
  }
  console.log("Products data loaded into Firestore");
}

// loadProductsData();

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
