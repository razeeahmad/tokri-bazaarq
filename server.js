const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/tokriDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error(err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  currentPrice: Number,
  oldPrice: Number,
  imageUrl: String,
  productUrl: String,
});
const Product = mongoose.model("Product", productSchema);

// Routes
// ...बाकी का कोड और imports

// Root route - टेस्ट के लिए
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Products रूट्स
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({ message: "✅ Product added successfully!" });
});

// Server Start
app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));

app.get('/', (req, res) => {
  res.send('Server is running!');
});