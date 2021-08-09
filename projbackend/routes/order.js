var express = require('express')
var router = express.Router();
const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus} = require("../controllers/order")
const {updateStock} = require("../controllers/product")
const {isAdmin,isLoggedIn,isAuthenticated}= require("../controllers/auth")
const {getUserByID,pushOrderInPurchaseList}= require("../controllers/user")
const { check } = require('express-validator');

//params
router.param("UserId",getUserByID)
router.param("orderId",getOrderById)
//Actual Routes goes here

//create
router.post('/order/create/:UserId',isLoggedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder)
//read
router.get('/order/all/:UserId',isLoggedIn,isAuthenticated,isAdmin,getAllOrders);

//status of order
router.get('/order/status/:UserId',isLoggedIn,isAuthenticated,isAdmin,getOrderStatus)
//update
router.put('order/:OrderId/status/:UserId',isLoggedIn,isAuthenticated,isAdmin,updateStatus);
//delete


module.exports= router;