// import mongoose, { models } from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const {ObjectId} = Schema;
// const ObjectId = mongoose.Types.ObjectId; // This is also valid for CommonJS Syntax


const ProductCartSchema = new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:'Product',
    },
    name:String,
    quantity:Number,
    totalPrice:Number,
})

const ProductCart = mongoose.model("ProductCart",ProductCartSchema);

const orderSchema = new Schema({
    products:[ProductCartSchema],
    transaction_id:{

    },
    amount:{type:Number},
    address:{
        type:String,
        maxlength:500,
    },
    status:{
        type:String,
        default:"Recieved",
        enum:["Cancelled","Delivered","Shipped","Processing","Recieved"]
    },
    updated:{
        type:Date,
    },
    user:{
        type:ObjectId,
        ref:'User',
    }    

},
{timestamps:true}
)

const Order = mongoose.model("Order",orderSchema);

module.exports = {Order,ProductCart};