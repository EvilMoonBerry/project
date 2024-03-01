
const { text } = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let messageSchema = new Schema ({
        timestamp:{type:String},
        from_userId:{type: String},
        to_userId: {type: String},
        message:{type: String},
});

module.exports = mongoose.model("Messages", messageSchema);