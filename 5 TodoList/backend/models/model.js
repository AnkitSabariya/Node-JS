const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, "Please Enter Task..."],
  }
});
module.exports = mongoose.model("Todo",todoSchema)