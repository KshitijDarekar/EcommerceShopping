const {Order,ProductCart}= require("../models/order")

//@getOrderById ~ param
exports.getOrderById = (req,res,next,id)=>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No order found in the DB"
            })
        }
        req.order=order;// req.order is populated here
        next();
    })
}

//@Create
exports.createOrder = (req,res)=>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to save your order in DB"
            })
        }
        res.json(order);
    })
}

//@read

exports.getAllOrders=(req,res)=>{
    Order.find()
    .populate("user","_id name")
    .exec((req,orders)=>{
        if(err){
            return res.status(400).json({
                error:"No orders found"
            })
        }
        res.json(orders)
    })
}

//status of order
exports.getOrderStatus = (req,res)=>{
    res.json(Order.schema.path("status").enumValues);
}

exports.updateStatus = (req,res)=>{
    Order.update(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"Cannot update Order Status"
                })
            }
            res.json(order)
        }
    )
}