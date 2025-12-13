const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true,"Title Required"] },
    author: { type: String, required: [true,"Author Required"]},
    price: { type: Number, required: [true,"Price Required"]},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
