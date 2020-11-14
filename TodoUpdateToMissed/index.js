const connectDB = require("../_config/db");
const TodoModel = require("../_config/models/todo.model");
const ValidationMiddleware = require("../_config/passport-strategy/middlewares/auth.validation.middleware");

module.exports = async function (context, req) {
  context.log("Update Todo to Missed function.");

  connectDB();

  const errors = ValidationMiddleware.validJWTNeeded(req, context.res);
  if (errors) {
    context.res.status(401).json({ error: errors });
  } else {
    let newModel = { completed: false, cancelled: false, missed: true };

    await TodoModel.updateOne({ _id: id }, { $set: newModel })
      .then((x) => {
        if (x.n == 0) {
          throw new Error("No Item Found to Update!");
        }
        context.res.status(200).json({ success: true });
      })
      .catch((err) => {
        context.log(err.message);
        context.res.json({ msg: err.message });
      });
  }
};
