const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    require: true,
  },
  // password: {
  //   type: String,
  //   require: true,
  // },
  displayname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  hash: {
    type: String,
    require: true,
  },
  salt: {
    type: String,
    require: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.GetDTO = function () {
  let model = {
    id: this._id,
    name: this.name,
    username: this.username,
    displayname: this.displayname,
    email: this.email,
  };
  return model;
};

module.exports = mongoose.model("Users", userSchema);
