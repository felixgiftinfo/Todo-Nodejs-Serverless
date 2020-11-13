const TodoModel = require("../../_config/models/todo.model");
const { v4: uuidv4 } = require("uuid");


async function insert(context) {
  context.log("Insert Todo function.");

  let newModel = new TodoModel(context.req.body);
  newModel.sku = uuidv4();
  await newModel
    .save()
    .then((x) => {
      if (!x) {
        throw new Error("Error in saving Todo");
      }
      context.res.status(200).json(x.GetDTO());
    })
    .catch((err) => {
      context.log(err.message);
      context.res.json({ msg: err.message });
    });
}
module.exports.insert = insert;
