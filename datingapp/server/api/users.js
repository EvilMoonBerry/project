//Required paths for variables and functions

var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const Users = require("../models/User");
const Messages = require("../models/Messages");
const jwt = require("jsonwebtoken");
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage })
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid')



// Test route
/*
router.get("/users", (req, res, next) => {
  Users.findOne({ email: "elli@elli.com" }).then((user) => {//finding exsiting user from database
    if (!user) {
      return res.status(403).json({ message: "No registeration with this email" });
    } else {
      console.log(user)
      res.send(user)
    }
  })
})*/


// Answers to post call to make a new user to database
router.post('/signup',
  body("Email").isEmail().trim().escape(), // checking email for funny stuff
  body("Password").isLength({ min: 8 }), // checking password lenght
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //if there is error in validationResult send an error back
      return res.status(400).json({ errors: errors.array() });
    }
    Users.findOne({ email: req.body.Email }).then((user) => { // Search database for existing email. If there is no existing email create a new user
      const generatedUserId = uuidv4() //create unique user id
      if (user) {
        return res.status(403).json({ email: "Email already in use." });
      } else {
        bcrypt.hash(req.body.Password, saltRounds, function (err, hash) { //password crypted to bcrypt-format (password,generated salt, function) https://www.npmjs.com/package/bcrypt
          if (err) throw err;
          console.log(hash)
          const sanitizedEmail = req.body.Email.toLowerCase() // making email lowercase for funny business
          Users.create( //creating a new user with default gender identity and gender intrest
            {
              user_id: generatedUserId,
              email: sanitizedEmail,
              hashed_password: hash,
              first_name: '',
              d_bday:'',
              m_bday:'',
              y_bday:'',
              show_identity:false,
              gender_identity:'man',
              gender_intrest:'woman',
              url:'',
              about:'',
              matches:[]
            }

          ).save
          const jwtPayload = { //making a  json web token with user info
            userId: generatedUserId,
            email: sanitizedEmail
          }
          jwt.sign(
            jwtPayload,
            process.env.SECRET,
            {
              expiresIn: 120
            },
            (err, token) => {
              res.json({ token, userId: generatedUserId }); //response with token and user_id
              return res.redirect("http://localhost:3000/profile");
            }
          );
        })
      }
    }).catch((err) => console.log(err));
  })


//An existing user logs in
router.post('/login',
  body("Email").trim().escape(),
  body("password"),
  (req, res, next) => {
    Users.findOne({ email: req.body.Email }).then((user) => {//finding exsiting user from database
      if (!user) {
        return res.status(403).json({ message: "No registeration with this email" });
      } else {
        bcrypt.compare(req.body.Password, user.hashed_password, function (err, result) { //To check the password matches https://www.npmjs.com/package/bcrypt 
          if (err)
          console.log(err);
          if (result) { //Making a JWT token and returning it as a JSON object
            const sanitizedEmail = req.body.Email.toLowerCase()
            const jwtPayload = { //making a  json web token with user info like in siqnup
              user_id: user.user_id,
              email: sanitizedEmail
            }
            jwt.sign(
              jwtPayload,
              process.env.SECRET,
              {
                expiresIn: 120
              },
              (err, token) => {
                res.json({ token, userId: user.user_id }); //response with token and user_id
                return res.redirect("http://localhost:3000/profile");
              }
            );
          } else {
            return res.status(403).json({ message: "Password or email is incorrect" })

          }
        })
      }

    }).catch((err) => console.log(err));

  });



// Update users data in database
router.put('/update',
  (req, res, next) => {
   //finding exsiting user from database and update their data
        Users.findOneAndUpdate({user_id: req.body.user_id}, {$set:{
          first_name: req.body.first_name,
          d_bday: req.body.d_bday,
         m_bday: req.body.m_bday,
          y_bday: req.body.y_bday,
          show_identity: req.body.show_identity,
          gender_identity: req.body.gender_identity,
          gender_intrest: req.body.gender_intrest,
          url: req.body.url,
          about: req.body.about,
          matches: req.body.matches
      }},{ new:true, upsert: true }).then((updateduser)=>
        console.log(updateduser)).catch ((err) => console.log(err));

    });


//Get user one person user data to be displayed as a potential match partner
router.get('/profilecard/:userId', (req,res,next)=>{
  Users.findOne({ user_id: req.params.userId }).then((user) => {
    res.send(user)
}).catch((err) => console.log(err));
})


//Get users by gender
router.get('/usergender/:gender', (req,res,next)=>{
  Users.find({ gender_identity: {$eq: req.params.gender}}).then((users) => {
    res.send( users)
}).catch((err) => console.log(err));
})

//update users match in data base that they have liked
router.put('/matches',
  (req, res, next) => {
        Users.findOneAndUpdate({user_id: req.body.userids}, {$push:{
          matches: {user_id: req.body.mUserids}
      }},{ upsert: true }).then((updateduser)=>
        console.log(updateduser)).catch ((err) => console.log(err));

    });

//Get matched users data from data base and send all of them back
    router.get('/allusers/:ids', (req,res,next)=>{
      const userIds = JSON.parse(req.params.ids)
      const useridlist =[]
      let i = 0
      while (userIds.length>i){
        useridlist.push(userIds[i].user_id)
        i= i+1
      }
      const pipeline = //search all of the matches by user_id that are in useridlist and put their profile data in array
            [
                {
                    '$match': {
                        'user_id': {
                            '$in': useridlist
                        }
                    }
                }
            ]
            Users.aggregate(pipeline).then((pipe)=>{ //https://www.mongodb.com/docs/manual/reference/operator/aggregation/objectToArray/
              res.send(pipe) //respond with profile data array
            })
    })

// Get send messages form Messages data base 
    router.get('/messages/:ids', (req,res,next)=>{
      const userIds = JSON.parse(req.params.ids)
      Messages.find({from_userId: userIds.userId , to_userId: userIds.coresId}).then((mesg)=>{
        res.send(mesg)
      })
      
    })

// Add a new message to the message database
    router.post('/newmessage', (req,res,next)=>{
      Messages.create(req.body).then((message)=>{
        res.send(message)
      }).catch ((err) => console.log(err));
    })
    




module.exports = router;