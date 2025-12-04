const express = require("express")
const cors = require("cors")
const database = require("./config/db.js")
const todoroutes = require("./routes/todoroutes.js")


const app = express()
database();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", todoroutes);


app.listen(5000,()=>{
    console.log("Sever Run at 5000 port");
    
})