/** @format */

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const newToken = (user) => {
  return jwt.sign(
    {
      user: user,
    },
    "mynameisatulkharwal",
    { expiresIn: 60 * 60 * 5 }
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

    //generte token
    let token = newToken(user);
    return res.render("index", { user, token });
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
      return res.status(200).send({ user, token });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { register, login };
