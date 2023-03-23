const passport = require("passport");
const local = require("passport-local");
const GitHubStrategy = require("passport-github2");
const User = require("../models/user.model");

const {
  createHash,
  isValidPassword,
} = require("../utils/middlewares/cryptPassword");

const localStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { firstName, lastName, email, age } = req.body;
        try {
          const user = await User.findOne({ email: username });
          if (user) {
            console.log("El usuario existe");
            return done(null, false);
          }
          const newUserInfo = {
            firstName,
            lastName,
            email,
            age,
            password: createHash(password),
          };
          /*           if (email === "adminCoder@coder.com") {
            newUserInfo.role = "admin";
          } */
          const newUser = await User.create(newUserInfo);
          return done(null, newUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new localStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ email: username });
          if (!user) {
            console.log("El usuario no existe");
            return done(null, false);
          }

          if (!isValidPassword(user, password)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {}
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.7290e4b051a63283",
        clientSecret: "f5e32cd357db7c721e776f91efabba4790cd051d",
        callbackURL: "http://localhost:8080/auth/githubcaIIback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const user = await User.findOne({ email: profile._json.email });

          if (!user) {
            const newUserInfo = {
              firstName: profile._json.name,
              lastName: "",
              age: 18,
              email: profile._json.email,
              password: "",
            };
            const newUser = await User.create(newUserInfo);
            return done(null, newUser);
          }
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

module.exports = initializePassport;
