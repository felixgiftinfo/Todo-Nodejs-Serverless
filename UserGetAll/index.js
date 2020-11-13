const connectDB = require("../_config/db");
const UserModel = require("../_config/models/user.model");
const utils = require("../_config/passport-strategy/utils");
const ValidationMiddleware = require("../_config/passport-strategy/middlewares/auth.validation.middleware");

module.exports = async function (context, req) {
  context.log("Get Users function.");

  connectDB();
  const errors = ValidationMiddleware.validJWTNeeded(req, context.res);
  if (errors) {
    context.res.status(401).json({ error: errors });
  } else {
    await UserModel.find()
      .then((user) => {
        if (!user) {
          context.res.status(200).json([]);
        }
        context.res.status(200).json(user.map((x) => x.GetDTO()));
      })
      .catch((err) => {
        context.log(err.message);
        context.res.status(400).json(err.message);
      });
  }
};
