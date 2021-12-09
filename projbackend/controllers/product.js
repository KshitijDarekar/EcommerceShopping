const User = require('../models/user');
const Order = require('../models/order');
const Category = require('../models/category');
const Product = require('../models/product');
const express = require('express');
const formidable = require('formidable');
const { IncomingForm } = require('formidable');

const fs = require('fs');

exports.getProductById = (req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found in the DB!"
            })
        }
        req.product = product;// req.product is populated here
        next();
    })
}

exports.getProduct = (req,res)=>{
    req.product.photo=undefined;// For Optimization=>Advantage: This request will be parsed very quick; For photos we can make another middleware 
    return res.json(req.product);
}

// @Middleware
exports.photo= (req,res,next)=>{
    if(req.product.photos.data){
        res.set("Content-Type",req.product.photos.contentType)
        return res.send(req.product.photos.data)

    }
    next();
}

//Create Product 
exports.createProduct = (req,res)=>{
    const form = new IncomingForm({keepExtensions:true });
    //form.keepExtensions=true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error:"Problem with Image"
            })
        }
        //destructure the fields
        const {name,description,price,category,stock}= fields;

        console.log('fields:', fields);
        console.log('files:', files);

        if( !name || !description || !price || !category || !stock){
            return res.status(400).json({
                error:" Please include all the fields"
            })
        }
        //TODO:RESTRICTINS ON FIELDS
        const product = new Product(fields);

        console.log('fields:', fields);
        console.log('files:', files);

        //HANDLE FILE HERE
        if(files.photos){
            if(files.photos.size>2097152){//Calculation: size in y mb = 1024*1024*y (here y =2 ,i.e 2 mb size)
                return res.status(400).json({
                    error:"file size should not exceed 2 mb"
                })
            }
            product.photos.data = fs.readFileSync(files.photos.path);
            product.photos.contentType = files.photos.type;
            }
        //save to DB
        product.save((err,product)=>{
        if(err){
            return res.status(400).json({
                error: err.message
            })
        }
        res.json(product)
        })
        });
    // const product = new Product(req.body);

}

//delete Product
exports.deleteProduct = (req,res)=>{
    const product = req.product;
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).res.json({
                error:"Failed to delete the product"
            })
        }
        res.json({
            message :` "${deletedProduct}" deleted succsfully`
        })
    })
}

//update Product
exports.updateProduct = (req,res)=>{
    const form = new IncomingForm({keepExtensions:true });
    //form.keepExtensions=true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error:"Problem with Image"
            });
        }
        console.log('fields:', fields);
        console.log('files:', files);

        //updation code
        let product = req.product;
        product = Object.assign(product,fields) //Updation code @ Javascript Object.assign() used

        console.log('fields:', fields);
        console.log('files:', files);

        //HANDLE FILE HERE
        if(files.photos){
            if(files.photos.size>2097152){//Calculation: size in y mb = 1024*1024*y (here y =2 ,i.e 2 mb size)
                return res.status(400).json({
                    error:"file size should not exceed 2 mb"
                })
            }
            product.photos.data = fs.readFileSync(files.photos.path);
            product.photos.contentType = files.photos.type;
            }
        //save to DB
        product.save((err,updatedproduct)=>{
        if(err){
            return res.status(400).json({
                error: "updation failed"
            })
        }
        res.json(updatedproduct)
        })
        });

}

//product listing
exports.getAllProducts = (req,res)=>{
    let limit = req.query.limit? Number(req.query.limit):8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

    Product.find()
    .select("-photos")
    .populate("category")
    .sort([[sortBy,"asc"]]) // sortData
    .limit(limit)//to limit no. of products to be seen in front-end
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error: "Unable to get Data"
            })
        }
        res.json(products);
    })
}

// Category List
exports.getAllUniqueCategories = (req,res)=>{
    Product.distinct("categories",{},(err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"No Category Found"
            })
        }
        res.json(categories);
    })
}


exports.updateStock = (req,res,next)=>{
    let myOperations = req.body.order.products.map((prod)=>{
        return {
            updateOne:{
                filter:{_id:prod._id},
                update:{$inc:{stock:-prod.count,sold:+prod.count}}
            }
        }
    })
    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Bulk Operation failed"
            })
        }
        next();
    })


}