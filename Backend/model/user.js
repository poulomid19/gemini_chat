const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    convoId: String,
    role: String,
    message: String
})
module.exports = mongoose.model("Chat", userSchema)
