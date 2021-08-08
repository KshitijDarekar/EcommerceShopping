// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;
// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
// import { createHmac } from 'crypto';
const crypto = require('crypto');
const {createHmac}=crypto;

const userSchema = new Schema({
    name:  {
      type:String,
      required:true,
      maxlength:32,
      trim:true,
    },
    lastName:  {
        type:String,
        required:false,
        maxlength:32,
        trim:true,
      },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    userInfo:{
        type:String,
        trim:true,
    },     
    encry_password:{
          type:String,
        //   trim:true,
        required:true,
      },
    salt:String, // String is shorthand for {type: String}
    role:{
        type:Number,
        default:0,
    },
    purchases:{
        type:Array,
        default:[],
    }
},
    {timestamps:true}
);

userSchema.virtual('password')
    .set(function(input_password){
        this._password=input_password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(input_password);
    })
    .get(function(){
        return this._password;
    })


userSchema.methods = {
    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try {
            const secret = this.salt;
            const hash = createHmac('sha256', secret)
                        .update(plainpassword)
                        .digest('hex');
            console.log(hash);
        return hash;
        } catch (error) {
            return "Some Error";
        }

    },
    authenticate:function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password;

    }
}

module.exports = mongoose.model("User",userSchema);