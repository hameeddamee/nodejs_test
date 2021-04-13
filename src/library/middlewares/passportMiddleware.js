const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const userService = require("../../components/user/user.service");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await userService.findUserByEmail(email);

        if (!user) {
          return done(null, false, { message: "No User Found" });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password Incorrect" });
          }
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    const user = await userService.findById(id);
    done(null, user);
  });
};
