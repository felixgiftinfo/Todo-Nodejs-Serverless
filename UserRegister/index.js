const connectDB = require("../_config/db");
const UserModel = require("../_config/models/user.model");
const utils = require("../_config/passport-strategy/utils");
const ValidationMiddleware = require("../_config/passport-strategy/middlewares/auth.validation.middleware");
const VerifyUserMiddleware = require("../_config/passport-strategy/middlewares/verify.user.middleware");

module.exports = async function (context, req) {
  context.log("Register User function.");

  //connectDB();

  let email = req.body.email;
  await UserModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        throw new Error("User already exist");
      }
    })
    .catch((err) => {
      context.log(err.message);
      context.res.status(400).json(err.message);
    });
    await registerUser(context);
};

async function registerUser(context) {
  const saltHash = utils.genPassword(context.req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new UserModel(context.req.body);
  newUser.hash = hash;
  newUser.salt = salt;

  await newUser
    .save()
    .then((user) => {
      context.res.json({ success: true, user: user.GetDTO() });
    })
    .catch((err) => {
      context.log(err.message);
      context.res.status(400).json(err.message);
    });
}
