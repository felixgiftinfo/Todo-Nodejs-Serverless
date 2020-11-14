const connectDB = require("../_config/db");
const TodoModel = require("../_config/models/todo.model");

module.exports = function (context, req) {
  context.log("Get Missed Todos function.");

  console.log("process.env");
  console.log(process.env);
  context.res.status(200).json(process.env);
  // connectDB();
  // await TodoModel.find({ missed: true })
  //   .then((x) => {
  //     if (!x) {
  //       context.res.status(200).json([]);
  //     }
  //     context.res.status(200).json(x.map((x) => x.GetDTO()));
  //   })
  //   .catch((err) => {
  //     context.log(err.message);
  //     context.res.status(400).json(err.message);
  //   });
};
