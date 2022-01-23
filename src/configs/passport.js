/** @format */
const passport = require("passport");
const User = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");
const { newToken } = require("../controllers/auth.controller");
var GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "785539319249-c4mse5mkucm2qlvsml85fq6f6ugm22lb.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/auth/google/callback",
      userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile?._json?.email })
        .lean()
        .exec();
      if (!user) {
        user = await User.create({
          first_name: profile?.given_name,
          last_name: profile?.family_name || "lastname",
          email: profile?._json?.email,
          password: uuidv4(),
        });
      }
      const token = newToken(user);

      return done(null, { user, token });
    }
  )
);

module.exports = passport;
