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
const cartController = require("./controllers/cart.controller");

const { register, login } = require("./controllers/auth.controller");
const authentication = require("./middlewares/authentication");

app.get("/login", (req, res) => {
  res.render("loginpage");
});

app.post("/register", register);
app.post("/userLogin", login);

app.use("/post/users", userController);

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/collection", productController);

app.use("/cart", cartController);

app.get("/checkout", (req, res) => {
  res.render("checkout");
});



app.get("/logout", (req, res)=>{
  res.clearCookie('user');
  res.redirect("/");
})

app.get("/payment", (req, res) => {
  res.render("payment");
});

app.get("/productDetail", (req, res) => {
  res.render("productDetail");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/verifyToken", authentication, (req, res)=>{
  res.send(req.user);
})

module.exports = app;
