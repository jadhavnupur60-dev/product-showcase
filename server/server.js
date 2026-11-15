
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dns = require("dns");

require("dotenv").config();

// Fix Node.js DNS resolution issue
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const Product = require("./models/Product");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory cart
let cart = [];

// Home route
app.get("/", (req, res) => {
  res.send("Product Showcase Backend is Running!");
});

// GET all products with pagination
app.get("/products", async (req, res) => {
  try {
    const limit = Math.max(
      1,
      Math.min(100, Number(req.query.limit) || 10)
    );

    const skip = Math.max(
      0,
      Number(req.query.skip) || 0
    );

    const products = await Product.find()
      .limit(limit)
      .skip(skip);

    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      totalProducts,
      limit,
      skip,
      products
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message
    });
  }
});

// POST a new product
app.post("/products", async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;

    // Validation
    if (
      typeof name !== "string" ||
      !name.trim() ||
      price === undefined ||
      price === null ||
      !Number.isFinite(Number(price)) ||
      Number(price) < 0 ||
      typeof description !== "string" ||
      !description.trim() ||
      (imageUrl !== undefined && typeof imageUrl !== "string")
    ) {
      return res.status(400).json({
        message: "Valid name, price and description are required"
      });
    }

    const product = new Product({
      name: name.trim(),
      price: Number(price),
      description: description.trim(),
      imageUrl: imageUrl || ""
    });

    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding product",
      error: error.message
    });
  }
});

// POST product to cart
app.post("/cart", async (req, res) => {
  try {
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid product ID"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const existingItem = cart.find(
      item => item.id === product._id.toString()
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        description: product.description,
        quantity: 1
      });
    }

    res.status(201).json({
      message: "Product added to cart successfully",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding product to cart",
      error: error.message
    });
  }
});

// GET cart items
app.get("/cart", (req, res) => {
  res.status(200).json(cart);
});

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error("MongoDB connection failed:", error.message);
  });
