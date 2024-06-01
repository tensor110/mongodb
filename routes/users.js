// Steps:-- 
// install mongoose - npm i mongoose
// require and set-up connection
// make Schema 
// Create model and export 

const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/practice")

const userschema = mongoose.Schema({
    username: String,
    name: String,
    age: Number
})

module.exports = mongoose.model("user", userschema)