
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dns = require("dns");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Fix Node.js DNS resolution issue
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const Product = require("./models/Product");
const User = require("./models/User");
const auth = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Separate in-memory carts for each user
const carts = {};

// Home route
app.get("/", (req, res) => {
  res.send("Product Showcase Backend is Running!");
});

// USER REGISTRATION
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" || !name.trim() ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof password !== "string" ||
      password.length < 6
    ) {
      return res.status(400).json({
        message: "Enter a valid name, email and password (minimum 6 characters)"
      });
    }

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase()
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword
    });

    await user.save();

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT secret is not configured"
      });
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
});

// USER LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase()
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
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

// POST product to cart (PROTECTED)
app.post("/cart", auth, async (req, res) => {
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

    const userId = req.user.userId;

    if (!carts[userId]) {
      carts[userId] = [];
    }

    const userCart = carts[userId];

    const existingItem = userCart.find(
      item => item.id === product._id.toString()
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      userCart.push({
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        description: product.description,
        quantity: 1
      });
    }

    res.status(201).json({
      message: "Product added to cart successfully",
      cart: userCart
    });

  } catch (error) {
    res.status(500).json({
      message: "Error adding product to cart",
      error: error.message
    });
  }
});

// GET logged-in user's cart (PROTECTED)
app.get("/cart", auth, (req, res) => {
  const userId = req.user.userId;

  res.status(200).json(carts[userId] || []);
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
