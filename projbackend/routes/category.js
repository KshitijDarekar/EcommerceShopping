var express = require('express')
var router = express.Router();
const {isAdmin,isLoggedIn,isAuthenticated}= require("../controllers/auth")
const {getUserByID}= require("../controllers/user")
const {getCategoryById,createCategory,getAllCategory,getCategory,updateCategory,deleteCategory}= require("../controllers/category")

//params
router.param('UserId', getUserByID);
router.param('CategoryId',getCategoryById);

//Actual Routes goes here

//create route
router.post('/category/create/:UserId',isLoggedIn,isAuthenticated,isAdmin,createCategory);

//read route
router.get('/category/:CategoryId',getCategory)
router.get('/categories',getAllCategory)

//update route
router.put('/category/:CategoryId/:UserId',isLoggedIn,isAuthenticated,isAdmin,updateCategory)

//delete route
router.delete('/category/:CategoryId/:UserId',isLoggedIn,isAuthenticated,isAdmin,deleteCategory)

module.exports= router;