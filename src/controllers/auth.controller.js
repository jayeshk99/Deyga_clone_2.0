/** @format */
require("dotenv").config;
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const newToken = (user) => {
  return jwt.sign(
    {
      user,
    },
    "abcdefghijklmnopqrstuvwxyz"
  );
};
const register = async (req, res) => {
  try {
    //check if email already exist
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user) {
      return res.status(400).send({ message: "email already in use" });
    }
    //if not then create user
    user = await User.create(req.body);

    // gengerating cart collection of user
    let user_id = user._id;
    let cart = await Cart.create({user_id: user_id})

    //generte token
    let token = newToken(user);
    res.cookie('user', token, { expires: new Date(new Date().getTime()+50*60*1000)})
    return res.redirect("/");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// const login = async (req, res) => {
//   try {
//     //check if user exists
//     let user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(400).send({ message: "No user found" });
//     }

//     let match = user.checkPassword(req.body.password);
//     if (match) {
//       const token = newToken(user);
//       return res.status(201).send({ user, token });
//     }
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };
const login = async (req, res) => {
  try {
    //check if user email exists or not
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "user doesnt exist" });
    }

    //compare passwords
    let match = user.checkPassword(req.body.password);

    if (match) {
      const token = newToken(user);
      res.cookie("user", token, { expires: new Date(new Date().getTime()+50*60*1000)});
      return res.status(200).send({ user, token });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { register, login };
