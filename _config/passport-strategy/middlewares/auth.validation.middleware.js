const utils = require("../utils");

const jwt = require("jsonwebtoken"),
  crypto = require("crypto");

exports.validJWTNeeded = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      let authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send();
      } else {
        const decodedToken = utils.verifyToken(authorization[1]);
        var expirationDate = new Date(decodedToken.exp);
        console.log(expirationDate.toLocaleString("en-US"));

        if (expirationDate < new Date()) {
          return "Token has expired!.";
          //return res.status(403).send({ msg: "Token has expired!." });
        }
        req.jwt = decodedToken;
        
        return; //next();
      }
    } catch (err) {
      return err.message;
      //return res.status(403).send(err.message);
    }
  } else {
    return "You are not authorized.";
    // return res.status(401).send();
  }
};
