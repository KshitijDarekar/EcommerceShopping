export const addItemToCart = (item,next)=>{
    let cart=[];
    if(typeof window !==undefined){
        if(localStorage.getItem("cart")){
            cart= JSON.parse(localStorage.getItem("cart"));
        }
        cart.push({
            ...item,
            count:1 
        })
        localStorage.setItem("cart",JSON.stringify(cart));
        next();
    }

}

//@used in CART PAGE
export const loadCart =() =>{
    if(typeof window !==undefined){
        if(localStorage.getItem("cart")){
            return  JSON.parse(localStorage.getItem("cart"));
        }

    }
}

//remove item from cart
export const removeItemFromCart = (productId)=>{
    let cart = [];
    if(typeof window !==undefined){
        if(localStorage.getItem("cart")){
            cart= JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((product,index)=>{
            if(product._id==productId){
                cart.splice(index,1);
            }
        })
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    return cart;
}

//empty cart after payment

export const cartEmpty = next =>{
    if(typeof window !==undefined){
        localStorage.removeItem("cart");
        let cart = [];
        localStorage.setItem("cart",JSON.stringify(cart));
        next();
    }
}

