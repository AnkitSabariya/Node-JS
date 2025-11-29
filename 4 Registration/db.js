const mongoose = require("mongoose");

exports.connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/4 Registration")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Error", err));
};