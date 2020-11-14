const connectDB = require("../_config/db");
const { getVerb, updateVerb, insertVerb, removeVerb } = require("./handlers");
const ValidationMiddleware = require("../_config/passport-strategy/middlewares/auth.validation.middleware");

module.exports = async function (context, req) {
  context.log("Todo function processed a request.");
  const method = req.method.toLowerCase();
  connectDB();

  const errors = ValidationMiddleware.validJWTNeeded(req, context.res);
  if (errors) {
    context.res.status(401).json({ error: errors });
  } else {
    switch (method) {
      case "get":
        if (!context.bindingData.id) await getVerb.get(context, req);
        else await getVerb.getById(context, req);
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
  }
};
