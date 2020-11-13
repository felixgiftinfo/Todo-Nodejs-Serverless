const mongoose = require("mongoose");
const schema = mongoose.Schema;

const schemaModel = new schema({
  sku: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  startTime: {
    type: String,
    require: true,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: String,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  missed: {
    type: Boolean,
    default: false,
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
});


schemaModel.methods.GetDTO = function () {
    let model = {
      id: this._id,
      sku:this.sku,
      name: this.name,
      description: this.description,
      startDate: this.startDate,
      startTime: this.startTime,
      endDate: this.endDate,
      endTime: this.endTime
    };
    return model;
  };

module.exports = mongoose.model("Todo", schemaModel);
