var express = require('express')
var router = express.Router();
const { check } = require('express-validator');
const {signout,signup,signin,isLoggedIn}= require("../controllers/auth")

//Syntax: router.post(route,express-validator,controller)

//Signup Route
router.post('/signup',[
    check("name")
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 chars long'),
    check("email")
        .isEmail()
        .withMessage("email is required"),
    check("password")
        .isLength({min:3})
        .withMessage("Password must be atleast 3 chars long")   

],signup)


//Signin Route
router.post('/signin',[
    check("email")
        .isEmail()
        .withMessage("email is required"),
    check("password")
        .isLength({min:3})
        .withMessage("Password must be atleast 3 chars long")   
],signin)
router.get('/signin',signin)

//Signout Route
router.get  ('/signout',signout)

// //test
// router.get('/testroute',isLoggedIn,(req,res)=>{
//     // res.send("A protected Route");
//     res.json(req.auth)

// })

module.exports= router;