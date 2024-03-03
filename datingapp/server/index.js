//course material used to prepare the project

const express = require("express");
const path = require("path");
const app = express();
var mongoose = require("mongoose");
var createError = require('http-errors');
const cors = require("cors");

require('dotenv').config();

app.use(cors({
    origin:"*",
}))

const PORT = 8000

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require ('./api/users.js'));



const mongoDB = "mongodb://127.0.0.1:27017/userdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.get('/', (req,res)=>{
    res.json('Hello to my app')
})

app.listen(PORT, ()=> console.log ('Server running in port ' + PORT))



  
  module.exports = app;