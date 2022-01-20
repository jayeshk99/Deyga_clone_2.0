/** @format */

const express = require("express");
const app = express();

// Set EJS as templating engine
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller");

const { register, login } = require("./controllers/auth.controller");

app.post("/register", register);
app.post("/login", login);

app.use("/post/users", userController);

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/collection", productController);

app.get("/checkout", (req, res) => {
  res.render("checkout");
});

app.get("/login", (req, res) => {
  res.render("loginpage");
});

app.get("/payment", (req, res) => {
  res.render("payment");
});

// app.get("/productDetail", (req, res) => {
//   res.render("productDetail");
// });

app.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = app;
