const TodoModel = require("../../_config/models/todo.model");



async function remove(context, req) {
  context.log("Delete Todo function.");

  let id = context.bindingData.id;
  let model = await TodoModel.findByIdAndDelete(id)
    .then((x) => {
      if (!x) {
        throw new Error("No Item Found!");
      }
      context.res.status(200).json({ success: true });
    })
    .catch((err) => {
      context.log(err.message);
      context.res.status(400).json(err.message);
    });
}

module.exports.remove = remove;
