
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Product = require("./Product");
const Order = require("./Order");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "LUNORA backend is running!" });
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
});

// Add a product
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add product",
      error: error.message,
    });
  }
});

// Create a new order
app.post("/api/orders", async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    if (
      !customer ||
      !Array.isArray(items) ||
      items.length === 0 ||
      typeof total !== "number" ||
      !Number.isFinite(total) ||
      total < 0
    ) {
      return res.status(400).json({
        message: "Please provide valid customer, items, and total.",
      });
    }

    const order = await Order.create({
      orderId: `LUN-${Date.now()}-${Math.floor(
        Math.random() * 10000
      )}`,
      customer,
      items,
      total,
      status: "Order placed",
    });

    res.status(201).json({
      message: "Order saved successfully!",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save order",
      error: error.message,
    });
  }
});

// Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

// Connect database and start server
mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });
