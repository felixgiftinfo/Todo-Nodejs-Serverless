const TodoModel = require("../../_config/models/todo.model");

exports.get = async function (context, req) {
  context.log("Get Todo function.");

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
