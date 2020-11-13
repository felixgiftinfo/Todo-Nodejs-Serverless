const UserModel = require("../../models/user.model");
const crypto = require("crypto");

exports.is_Login_Fields_Valid = (req, res) => {
  let errors = [];

  if (req.body) {
    if (!req.body.email) {
      errors.push("Missing email field");
    }
    if (!req.body.password) {
      errors.push("Missing password field");
    }
    // if (errors.length == 0) {
    //   return;
    // }
  } else {
    errors.push("Missing valid fields");
  }
  return errors.join(",");
  //   if (req.body) {
  //     if (!req.body.email) {
  //       errors.push("Missing email field");
  //     }
  //     if (!req.body.password) {
  //       errors.push("Missing password field");
  //     }
  //     if (errors.length) {
  //       res.status(400).send({ errors: errors.join(",") });
  //     } else {
  //       return;
  //     }
  //   } else {
  //     res.status(400).send({ errors: "Missing valid fields" });
  //   }
};

exports.is_User_Register_Fields_Valid = (req, res) => {
  let errors = [];

  if (req.body) {
    if (!req.body.email) {
      errors.push("Missing email field");
    }
    if (!req.body.password) {
      errors.push("Missing password field");
    }
    if (!req.body.username) {
      errors.push("Missing username field");
    }
    if (!req.body.displayname) {
      errors.push("Missing displayname field");
    }
    // if (errors.length) {
    //   return res.status(400).send({ errors: errors.join(",") });
    // } else {
    //   return;
    // }
  } else {
    errors.push("Missing valid fields");
  }
  return errors.join(",");

  //   if (req.body) {
  //     if (!req.body.email) {
  //       errors.push("Missing email field");
  //     }
  //     if (!req.body.password) {
  //       errors.push("Missing password field");
  //     }
  //     if (!req.body.username) {
  //       errors.push("Missing username field");
  //     }
  //     if (!req.body.displayname) {
  //       errors.push("Missing displayname field");
  //     }
  //     if (errors.length) {
  //       return res.status(400).send({ errors: errors.join(",") });
  //     } else {
  //       return;
  //     }
  //   } else {
  //     return res.status(400).send({ errors: "Missing valid fields" });
  //   }
};

exports.isPasswordAndUserMatch = (req, res) => {
    let errors = [];
  UserModel.findOne({ email: req.body.email }).then((user) => {
      console.log('user')
      console.log(user)

    if (!user) {
        errors.push("Wrong credentials")
    } else {
      let passwordFields = user.password.split("$");
      let salt = passwordFields[0];
      let hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      if (hash === passwordFields[1]) {
        req.body = {
          userId: user._id,
          email: user.email,
          permissionLevel: user.permissionLevel,
          provider: "email",
          name: user.firstName + " " + user.lastName,
        };
        //return next();
      } else {
        errors.push("Wrong credentials")
        //return res.status(400).send({ errors: ["Invalid e-mail or password"] });
      }
    }
  });
  return errors.join(",");
};
