var express = require('express')
var router = express.Router();
const {isAdmin,isLoggedIn,isAuthenticated}= require("../controllers/auth")
const {getUserByID}= require("../controllers/user")
const {getCategoryById,createCategory,getAllCategory,getCategory,updateCategory,deleteCategory}= require("../controllers/category")
const {getProductById,createProduct,getProduct,deleteProduct,updateProduct,photo,getAllProducts,getAllUniqueCategories,}= require("../controllers/product")
const { check } = require('express-validator');


//params
router.param('UserId', getUserByID);
router.param('ProductId',getProductById);

//Actual Routes goes here
router.post('/product/create/:UserId',isLoggedIn,isAuthenticated,isAdmin,
createProduct);

// Read Route
router.get('/product/:ProductId',getProduct)
router.get("/product/photos/:ProductId",photo)

//delete product
router.delete('/product/:ProductId/:UserId',isLoggedIn,isAuthenticated,isAdmin,deleteProduct)
//update product
router.put('/product/:ProductId/:UserId',isLoggedIn,isAuthenticated,isAdmin,updateProduct)

//listing route
router.get("/products",getAllProducts)

router.get("/products/categories",getAllUniqueCategories)

module.exports= router;