const TodoModel = require("../../_config/models/todo.model");

async function update(context) {
  context.log("Update Todo function.");
  let id = context.bindingData.id;
  let newModel = context.req.body;

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
module.exports.update = update;
