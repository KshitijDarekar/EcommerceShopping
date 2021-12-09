import { API } from "../../backend";

// @desc: Category Calls

//create categories
export const createCategory = (userId,token,category)=>{
    // console.log("User_ID = " + userId);
    // console.log("token = " + token);
    // console.log("category = " + JSON.stringify(category));
    return (fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(error=>{
        console.log(JSON.stringify(error));
        return JSON.stringify(error)
    })
    )
}

// get a category
export const getCategory = CategoryId =>{
    return fetch(`${API}/category/${CategoryId}`,{
        method:"GET"
    }).then(response =>{
        return response.json()
    })
    .catch(err=>{console.log(err)}); 
}


// get all categories
export const getCategories = ()=>{
    return fetch(`${API}/categories`,{
        method:"GET"
    }).then(response =>{
        return response.json();
    })
    .catch(err=>{console.log(err)})

}

//update a category
export const updateCategory = (categoryId,userId,token,category)=>{
    // console.log("User_ID = " + userId);
    // console.log("token = " + token);
    // console.log("product = " + JSON.stringify(product));

    return (fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(error=>{
        console.log(JSON.stringify(error));
        return JSON.stringify(error)
    })
    )
}


//delete category
export const deleteCategory = (CategoryId,UserId,token)=>{
    // console.log("User_ID = " + userId);
    // console.log("token = " + token);
    // console.log("product = " + JSON.stringify(product));
    return (fetch(`${API}/category/${CategoryId}/${UserId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(error=>{
        console.log(JSON.stringify(error));
        return JSON.stringify(error)
    })
    )
}

// @DESC: Product Calls

//create product
export const createProduct = (userId,token,product)=>{
    console.log("User_ID = " + userId);
    console.log("token = " + token);
    console.log("product = " + JSON.stringify(product));
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body:product
    })
    .then(response => {
        return response.json();
    })
    .catch(error=>{
        console.log(JSON.stringify(error));
        return JSON.stringify(error)
    })
    
}

// get all products
export const getProducts = ()=>{
    return fetch(`${API}/products`,{
        method:"GET"
    }).then(response =>{
        return response.json();
    })
    .catch(err=>{console.log(err)})

}


// get a product
export const getProduct = ProductId =>{
    // console.log("Product id inside getProduct function : "+ProductId);
    // console.log("Product id inside getProduct function : "+ProductId.substring(0, ProductId.length - 1));
    // let correctProductId = ProductId.substring(0, ProductId.length - 1);
    return fetch(`${API}/product/${ProductId}`,{
        method:"GET"
    }).then(response =>{
        return response.json()
    })
    .catch(err=>{console.log(err)}); 
}


//update a product
export const updateProduct = (productId,userId,token,product)=>{
    // console.log("User_ID = " + userId);
    // console.log("token = " + token);
    // console.log("product = " + JSON.stringify(product));
    return (fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            // "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:product
    })
    .then(response => {
        return response.json();
    })
    .catch(error=>{
        console.log(JSON.stringify(error));
        return JSON.stringify(error)
    })
    )
}

//delete product 

export const deleteProduct = (productId,userId,token,product)=>{
    // console.log("User_ID = " + userId);
    // console.log("token = " + token);
    // console.log("product = " + JSON.stringify(product));
    return (fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:product
    })
    .then(response => {
        return response.json();
    })
    .catch(error=>{
        console.log(JSON.stringify(error));
        return JSON.stringify(error)
    })
    )
}