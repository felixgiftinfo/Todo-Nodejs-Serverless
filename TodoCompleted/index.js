const connectDB = require("../_config/db");
const TodoModel = require("../_config/models/todo.model");
const ValidationMiddleware = require("../_config/passport-strategy/middlewares/auth.validation.middleware");

module.exports = async function (context, req) {
  context.log("Get Completed Todos function.");

  connectDB();

  const errors = ValidationMiddleware.validJWTNeeded(req, context.res);
  if (errors) {
    context.res.status(401).json({ error: errors });
  } else {
    await TodoModel.find({ completed: true })
      .then((x) => {
        if (!x) {
          context.res.status(200).json([]);
        }
        context.res.status(200).json(x.map((x) => x.GetDTO()));
      })
      .catch((err) => {
        context.log(err.message);
        context.res.status(400).json(err.message);
      });
  }
};
