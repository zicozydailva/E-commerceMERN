require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const productRoute = require("./routes/product");
const userRoutes = require("./routes/user");
const cartRoutes = require("./routes/cart");

const port = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);

const start = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("DB connected Successfully"));

    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
