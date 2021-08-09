var express = require('express')
var router = express.Router();
const {signout,signup,signin,isLoggedIn,isAuthenticated}= require("../controllers/auth")
const {getUserByID,getUser,updateUser,userPurchaseList}= require("../controllers/user")


router.param('UserId', getUserByID)

// route to trigger the capture
router.get('/user/:UserId',isLoggedIn,isAuthenticated, getUser)

router.put('/user/:UserId',isLoggedIn,isAuthenticated, updateUser)
// router.get('/users',getAllUsers)

router.get('/orders/user/User:Id',isLoggedIn,isAuthenticated,userPurchaseList);

module.exports= router;