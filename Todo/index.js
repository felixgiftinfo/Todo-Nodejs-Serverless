const connectDB = require("../_config/db");
const { getVerb,getIdVerb, updateVerb, insertVerb, removeVerb } = require("./handlers");

module.exports = async function (context, req) {
  context.log("Todo function processed a request.");
  const method = req.method.toLowerCase();
  connectDB();

  switch (method) {
    case "get":
      if (!context.bindingData.id) await getVerb.get(context, req);
      else await getIdVerb.getById(context, req);
      break;
    case "post":
      await insertVerb.insert(context, req);
      break;
    case "put":
      await updateVerb.update(context, req);
      break;
    case "delete":
      await removeVerb.remove(context, req);
      break;
    default:
      break;
  }
};
