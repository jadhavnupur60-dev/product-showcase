
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Product data
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 55000,
    description: "Powerful laptop for daily use"
  },
  {
    id: 2,
    name: "Headphones",
    price: 2000,
    description: "High quality wireless headphones"
  },
  {
    id: 3,
    name: "Smartphone",
    price: 25000,
    description: "Latest smartphone"
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 4000,
    description: "Modern smart watch"
  }
];

// In-memory cart
let cart = [];

// Home route
app.get("/", (req, res) => {
  res.send("Product Showcase Backend is Running!");
});

// GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// POST product to cart
app.post("/cart", (req, res) => {
  const { productId } = req.body;

  const product = products.find(
    (item) => item.id === Number(productId)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  const existingItem = cart.find(
    (item) => item.id === product.id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  res.status(201).json({
    message: "Product added to cart successfully",
    cart: cart
  });
});

// GET cart items
app.get("/cart", (req, res) => {
  res.json(cart);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
