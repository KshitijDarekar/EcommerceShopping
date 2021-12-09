const User = require('../models/user');
const {validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
require('dotenv').config()

//Signup
exports.signup = (req,res)=>{

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        let array = []
        errors.array().forEach(e => array.push(e.msg ))
        console.log(array);
        return res.json({ error: array })

        // console.log(errors.array())
        // console.log(errors.array()[0].msg)
        // return res.status(400).json({ errors: errors.array() });
        // return res.status(400).json({ error: errors.array()[0].msg }); // this one also works when we want to present only oe error at a time


        // below code not working
        // return res.status(400).json(
        //     { 
        //         errors: {
        //             message:errors.array()[0].msg,
        //             param:errors.array()[0].param
        //         }
        //     });
      }

    const user= new User(req.body);
    user.save((err,user)=>{
        if(err){    
            console.log(err);
            res.send(err.message);
            return res.status(400).json({
                    err:"NOT ABLE TO SAVE USER IN DB"
            })// json helps for the front-end developers to craft a error message
        }
        res.json({
            name:user.name,
            email:user.email,
            id:user._id
        })
    }) 
    // console.log("REQ BODY=",req.body);
    // res.json({
    //     message:'SIGNUP rOUTE wORKS'
    // })
}

//Signin 
exports.signin=(req,res)=>{
    const {email,password}=req.body; 
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors)

        let array = []
        errors.array().forEach(e => array.push(e.msg ))
        console.log(array);
        return res.json({ error: array })

        // return res.status(400).json({ errors: errors.array() });
      }

    User.findOne({email},(err,user)=>{
        if(err || !user){
            return  res.status(400).json({
                error:"User with this email does not exist."
            });
        }
        else if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Email and Password does not match"
            })
        }
        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        // put token in cookie
        res.cookie("token",token,{expire:new Date()+9999});

        //send response to front-end
        const {_id,name,email,role}= user;

        return res.json({
            token,
            user:{//_id:_id is same as _id , similarly name:name & role:role is same as name,role
                _id,
                name,
                email,
                role
            }
        })


    })
}

//Signout
exports.signout=(req,res)=>{

    res.clearCookie("token");
   return res.json({
        message:"User Signout Successfully"
    })

}

// Protected Routes
exports.isLoggedIn = expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth",
    algorithms: ['RS256','sha1','RSA','HS256']
})
//Custom Middlewares

//isAuthenticated
exports.isAuthenticated=(req,res,next)=>{
    // req.auth => isLoggedIn middle ware
    //req.profile=> profile property inside user wil be made through the front-end(will be set only if the user is logged in)
    let checker = req.profile && req.auth && req.profile._id==req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:"Access Denied !"
        })
    }
    next();
}

//isAdmin
exports.isAdmin=(req,res,next)=>{
    if(req.profile.role===0){
        return res.status(403).json({
            error:"You are not ADMIN"
        })
    }
    next();
}