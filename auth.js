// Passport
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

// Password authentication
passport.use(
  new localStrategy(async (USERNAME, PASSWORD, done) => {
    try {
      //   console.log("Received credentials:", USERNAME, password);
      const user = await Person.findOne({ USERNAME });
      if (!user) return done(null, false, { message: "incorrect username." });
      const isPasswordMatch = await user.comparePassword(PASSWORD);

      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "incorrect Password." });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
