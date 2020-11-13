const TodoModel = require("../../_config/models/todo.model");

const ValidationMiddleware = require("../../_config/passport-strategy/middlewares/auth.validation.middleware");

exports.get = async function (context) {
  context.log("Get Todo function.");
  const errors = ValidationMiddleware.validJWTNeeded(req, context.res);
  if (errors) {
    context.res.status(401).json({ error: errors });
  } else {
    await TodoModel.find()
      .then((x) => {
        if (!x) {
          context.res.status(200).json([]);
          // throw new Error("No Item Found!");
        }
        context.res.status(200).json(x.map((x) => x.GetDTO()));
      })
      .catch((err) => {
        context.log(err.message);
        context.res.status(400).json(err.message);
      });
  }
};

exports.getById = async function (context) {
  context.log("GetById Todo function.");

  let id = context.bindingData.id;
  await TodoModel.findById(id)
    .then((x) => {
      if (!x) {
        throw new Error("No Item Found!");
      }
      context.res.status(200).json(x.GetDTO());
    })
    .catch((err) => {
      context.log(err.message);
      context.res.status(400).json(err.message);
    });
};

//module.exports.get = get;
//module.exports.getById = getById;