const User = require('../models/user');
const Order = require('../models/order');
const Category = require('../models/category');

exports.getCategoryById = (req,res,next,id)=>{
    
    Category.findById(id).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Category not found in the DB!"
            })
        }
        req.category = category;// req.category is populated here
        next();
    })
}

//Create Category 
exports.createCategory = (req,res)=>{
    const category = new Category(req.body);
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:'NOT able to save category in DB'
            })
        }
        return res.json({category})
    })
}

exports.getCategory = (req,res)=>{
    return res.json(req.category);
}

exports.getAllCategory = (req,res)=>{
    Category.find().exec( (err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"No Categories Found"
            })
        }
        res.json(categories);
    })
}

//update
exports.updateCategory=(req,res)=>{
    // const category = req.category; //Remember: getting req.category from middleware(.getCategoryById) params
    // category.name= req.body.name

    Category.findByIdAndUpdate(
        {_id:req.category._id},
        {$set:req.body},
        {new:true,UseFindAndModify:false},
        (err,updatedCategory)=>{
            if(err){
                return res.status(400).json({
                    error:"Failed to update the Category  "
                })
            }
            res.json(updatedCategory);
        }

    )
}

//delete
exports.deleteCategory = (req,res)=>{
    const category = req.category; // here category stores the instance of a Mongoose Model - Category && req.category is from middleware -getCategoryById
    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete this category"
            })
        }
        else{
            res.json({
                message:`category:"${category.name}" with id:"${category._id}" was successfully deleted!`
            })
        }

    })
}
