const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoModel = new Schema({
  subject: {
    required: true,
    type: String,
  },
  message: {
    required: true,
    type: String,
  },
  status: {
    required: true,
    type: Boolean,
  },
  deadline: {
    type: Date,
  },
});

module.exports = mongoose.model("TodoModel", todoModel);
