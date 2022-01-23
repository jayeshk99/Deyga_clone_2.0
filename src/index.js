/** @format */

const express = require("express");
const app = express();
const passport = require("./configs/passport");

// Set EJS as templating engine
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());

const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller");
const cartController = require("./controllers/cart.controller");
const Cart = require("./models/cart.model");

const { register, login } = require("./controllers/auth.controller");
const authentication = require("./middlewares/authentication");

passport.serializeUser(function (user, callback) {
  callback(null, user);
});

passport.deserializeUser(function (user, callback) {
  callback(null, user);
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  async (req, res) => {
    res.cookie("user", req.user.token, {
      expires: new Date(new Date().getTime() + 50 * 60 * 1000),
    });
    let cart = await Cart.create({ user_id: req.user.user._id });
    return res.redirect("/");
    // return res.status(201).json({ user: req.user.user, token: req.user.token });
  }
);

app.get("/auth/google/failure", (req, res) => {
  return res.redirect("/signup");
});


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
