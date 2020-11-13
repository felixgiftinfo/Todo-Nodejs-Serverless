var LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user.model");


module.exports = function (passport) {
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      await UserModel.findOne({ username: username }, async function (
        err,
        user
      ) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        let _user = await UserModel.findOne({ password: password });
        if (!_user) {
          return done(null, false);
        }
        // if (!user.verifyPassword(password)) {
        //   return done(null, false);
        // }
        return done(null, user);
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => done(err, user));
  });
};
