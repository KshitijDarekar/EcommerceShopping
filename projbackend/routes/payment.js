var express = require('express')
var router = express.Router();

const {isAdmin,isLoggedIn,isAuthenticated}= require("../controllers/auth")
const {getUserByID}= require("../controllers/user")
const { processPayment, getToken } = require('../controllers/payment');

//params
router.param("UserId",getUserByID)


router.get('/payment/gettoken/:UserId',isLoggedIn,isAuthenticated,getToken);

router.post('/payment/gateway/:UserId',isLoggedIn,isAuthenticated,processPayment)



module.exports= router;