//import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const {ObjectId} = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
    },
    description:{
        type:String,
        trim:true,
        required:true,
        maxlength:2000,
    },
    price:{
        type:Number,
        trim:true,
        required:true,
        maxlength:32,
    },
    category:{
        type:ObjectId,
        ref:'Category',
        required:true, 

     },
     stock:{
         type:Number,
     },
     sold:{
        type:Number,
        default:0
     },
     photos:{
         data: Buffer,
         contentType:String,
     }

},
{timestamps:true}
)

module.exports=mongoose.model("Product",productSchema);