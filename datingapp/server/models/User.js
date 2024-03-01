
const { text } = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema ({
        user_id:{type:String},
        hashed_password:{type: String},
        first_name: {type: String},
        d_bday:{type: Number},
        m_bday:{type: Number},
        y_bday:{type: Number},
        show_identity:{type: Boolean},
        gender_identity:{type: String},
        gender_intrest:{type: String},
        email:{type: String},
        url:{type: String},
        about:{type: String},
        matches:{type: Array}
});

module.exports = mongoose.model("Users", userSchema);