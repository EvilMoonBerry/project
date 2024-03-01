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


//GET route. Response with JSON
router.get("/users", (req, res, next) => {
  Users.findOne({ email: "elli@elli.com" }).then((user) => {//finding exsiting user from database
    if (!user) {
      return res.status(403).json({ message: "No registeration with this email" });
    } else {
      console.log(user)
      res.send(user)
    }
  })
})

router.post('/signup',
  body("Email").isEmail().trim().escape(),
  body("Password").isLength({ min: 8 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body)
    Users.findOne({ email: req.body.Email }).then((user) => { // Search database for existing email. If there is no existing email create a new user
      const generatedUserId = uuidv4()
      console.log(generatedUserId)
      if (user) {
        console.log(user)
        return res.status(403).json({ email: "Email already in use." });
      } else {
        bcrypt.hash(req.body.Password, saltRounds, function (err, hash) { //password crypted to bcrypt-format (password,generated salt, function) https://www.npmjs.com/package/bcrypt
          if (err) throw err;
          console.log(hash)
          const sanitizedEmail = req.body.Email.toLowerCase()
          Users.create(
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
          const jwtPayload = {
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
              res.json({ token, userId: generatedUserId });
              return res.redirect("http://localhost:3000/profile");
            }
          );
        })
      }
    }).catch((err) => console.log(err));
  })


//Login using JWT token. With a correct login information, it should return JWT token as a JSON object.
router.post('/login',
  body("Email").trim().escape(),
  body("password"),
  (req, res, next) => {
    console.log(req.body)
    console.log(req.body.Password)
    
    Users.findOne({ email: req.body.Email }).then((user) => {//finding exsiting user from database
      console.log(user.hashed_password)
      console.log('olen user id', user.user_id)
      if (!user) {
        return res.status(403).json({ message: "No registeration with this email" });
      } else {
        bcrypt.compare(req.body.Password, user.hashed_password, function (err, result) { //To check the password matches https://www.npmjs.com/package/bcrypt 
          if (err)
          console.log(err);
          if (result) { //Making a JWT token and returning it as a JSON object
            const sanitizedEmail = req.body.Email.toLowerCase()
            const jwtPayload = {
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
                res.json({ token, userId: user.user_id });
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


router.put('/update',
  
  (req, res, next) => {
    console.log(req.body.user_id)
   //finding exsiting user from database
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



router.get('/profilecard/:userId', (req,res,next)=>{
  console.log(req.params.userId)
  Users.findOne({ user_id: req.params.userId }).then((user) => {
    console.log(user)
    res.send(user)
}).catch((err) => console.log(err));
})







router.get('/usergender/:gender', (req,res,next)=>{
  console.log('gens ',req.params.gender)
  Users.find({ gender_identity: {$eq: req.params.gender}}).then((users) => {
    console.log('user gen', users)
    
    
    res.send( users)
}).catch((err) => console.log(err));
})

router.put('/matches',
  (req, res, next) => {
    console.log('body',req.body.userids)
    console.log('body',req.body.mUserids)
    //console.log(req.body.info)
   //finding exsiting user from database
        Users.findOneAndUpdate({user_id: req.body.userids}, {$push:{

          matches: {user_id: req.body.mUserids}
      }},{ upsert: true }).then((updateduser)=>
        console.log(updateduser)).catch ((err) => console.log(err));

    });

    



    router.get('/allusers/:ids', (req,res,next)=>{
      console.log('tänne tultiin')
      console.log('jehjeh',req.params.ids)
      const userIds = JSON.parse(req.params.ids)
      const useridlist =[]
      console.log(userIds.length)
      let i = 0
      while (userIds.length>i){
        useridlist.push(userIds[i].user_id)
        i= i+1
      }
      //console.log('ides',userIds[1].user_id)
      console.log('list', useridlist)
      const pipeline =
            [
                {
                    '$match': {
                        'user_id': {
                            '$in': useridlist
                        }
                    }
                }
            ]
            Users.aggregate(pipeline).then((pipe)=>{
              console.log('pipe',pipe)
              res.send(pipe)
            })

      
    })


    router.get('/messages/:ids', (req,res,next)=>{
      console.log('tänne tultiin taas')
      console.log('messages stuff',req.params.ids)
      const userIds = JSON.parse(req.params.ids)
      console.log('messageIDS',userIds)
      console.log('ides',userIds.userId)
      console.log('ides',userIds.coresId)

      Messages.find({from_userId: userIds.userId , to_userId: userIds.coresId}).then((mesg)=>{
        console.log('tetetutululu',mesg)
        res.send(mesg)
      })
      
    })


    router.post('/newmessage', (req,res,next)=>{
      console.log('newmessage',req.body)
      Messages.create(req.body).then((message)=>{
        console.log('created',message)
        res.send(message)
      }).catch ((err) => console.log(err));
    })
    




module.exports = router;