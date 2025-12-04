const mongoose = require("mongoose");
const database = () =>{
mongoose.connect("mongodb://localhost:27017/todolist",{})
.then(()=> console.log("DB connected"))
.catch((err)=> console.error("DB error",err))
}
module.exports = database;