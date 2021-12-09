const User = require('../models/user');
const Order = require('../models/order');

//middleware
exports.getUserByID = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(400).json({
                error:"No user found in the DB!"
            })
        }
        req.profile=user // req.profile is populated here
        next();
    })
}

exports.getUser = (req,res)=>{
    //Hide senstive infomration from user browser (salt,encry_password)
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    //Note: We are not making them undefined in the database, we are just making them undefined in the User's profile

    return res.json(req.profile)


}

//update User
exports.updateUser = (req,res)=>{
    //Model.findOneAndReplace({ _id: id }, update, options, callback).
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,UseFindAndModify:false},
        (err,user)=>{
            if(err){
                return resp.status(400).res.json({
                    error:"You are not authorized to update"
                })
            }
            //Hide senstive infomration from user browser (salt,encry_password)
            user.salt=undefined;
            user.encry_password=undefined;
            user.createdAt=undefined;
            user.updatedAt=undefined;
            res.json(user);
        }

    )

}

// get user's Purchase List
exports.userPurchaseList = (req,res)=>{ 
    Order.find({user:req.profile._id}) // pulling information from Order Model
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No Order in this Account",
            })
        }
        return res.json(order);
    })

}

// MiddleWare
exports.pushOrderInPurchaseList = (req,res,next)=>{
    let purchases = [];
    req.body.order.products.forEach(item =>{
        purchases.push({
            _id:item._id,
            name:item.name,
            category:item.category,
            description:item.description,
            quantity:item.quantity,
            amount:req.body.order.amount,
            transaction_id:req.body.order.transaction_id
        });  
    });

    //store purchases details in DB
    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push:{purchases:purchases}},
        {new:true},
        (err,items)=>{
            if(err){
                return res.status(400).json({
                    error:"Unable to save purchase List"
                })
            }
            next();
        }
    );
}

// get All the users Detail
/*
exports.getAllUsers= (req,res)=>{
    User.find().exec((err,users)=>{
        if(err||!users){
            return res.status(400).json({
                error:"No users found in the DB!"
            })
        }

        return res.json(users)
    })
}
*/