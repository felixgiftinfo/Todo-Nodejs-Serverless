const connectDB = require("../_config/db");
const UserModel = require("../_config/models/user.model");
const utils = require("../_config/passport-strategy/utils");
const VerifyUserMiddleware = require("../_config/passport-strategy/middlewares/verify.user.middleware");
const { check, validationResult } = require("express-validator");
//const passport = require("passport");

module.exports = async function (context, req) {
  context.log("Login User function.");

  connectDB();
  // require("../_config/passport-strategy/passport")(passport);
  // passport.initialize();

  const errors = VerifyUserMiddleware.is_Login_Fields_Valid(req, context.res);
  //const errors = validationResult(req);
  if (errors) {
    context.res.status(401).json({ error: errors });
  } else {
    let email = req.body.email;

    await UserModel.findOne({ email: email })
      .then((user) => {
        if (!user) {
          throw new Error("No user found!");
        }
        const isValid = utils.validPassword(
          req.body.password,
          user.hash,
          user.salt
        );

        if (isValid) {
          const tokenObject = utils.issueJWT(user);
          context.res.status(200).json({
            success: true,
            token: tokenObject.token,
            expiresIn: tokenObject.expires,
          });
        } else {
          context.res
            .status(401)
            .json({ success: false, msg: "you entered the wrong credentials" });
        }

        // context.res.status(200).json(user.GetDTO());
        // context.res.status(200).json(user.map((user) => user.GetDTO()));
      })
      .catch((err) => {
        //context.log(err.message);
        context.res.status(400).json(err.message);
      });
  }
};
