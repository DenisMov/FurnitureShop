const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Перевірка змінних середовища
const requiredEnvVars = [
  "FIREBASE_TYPE",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_PRIVATE_KEY_ID",
  "FIREBASE_PRIVATE_KEY",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_CLIENT_ID",
  "FIREBASE_AUTH_URI",
  "FIREBASE_TOKEN_URI",
  "FIREBASE_AUTH_PROVIDER_CERT_URL",
  "FIREBASE_CLIENT_CERT_URL",
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Змінна середовища ${envVar} відсутня`);
  }
});

const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.REACT_APP_FIREBASE_PROJECT_ID, // Використовуємо REACT_APP_FIREBASE_PROJECT_ID
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/products", async (req, res) => {
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
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

app.post("/api/register", async (req, res) => {
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

app.post("/api/orders", async (req, res) => {
  try {
    const order = req.body;
    const ordersRef = db.collection("orders");
    await ordersRef.add(order);
    res.status(201).json({ message: "Order has been posted" });
  } catch (error) {
    res.status(500).json({ message: "Error posting order", error });
  }
});

app.get("/api/orders", async (req, res) => {
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

module.exports = app;
