require("dotenv").config
const jwt = require("jsonwebtoken")

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "abcdefghijklmnopqrstuvwxyz", function(err, decoded) {
      if (err) return reject(err)
      resolve(decoded)
    })
  })
}

module.exports = async (req, res, next) => {

  if (!req.headers.authorization)
    return res.redirect("/signup");

  const bearerToken = req.headers.authorization
  if (!bearerToken)
    return res.redirect("/signup");

  const token = bearerToken.split(" ")[1]

  let user
  try {
    user = await verifyToken(token);
  } catch (error) {
    return res.status(401).send({ message: "token is not valid" })
  }
  req.user = user.user

  next()
}
