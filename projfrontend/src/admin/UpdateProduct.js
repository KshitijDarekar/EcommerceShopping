import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link ,Redirect } from "react-router-dom";
import { createProduct, getCategories, getProduct, updateProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

function UpdateProduct(props) {
    const { user, token } = isAuthenticated();
    const [success, setSuccess] = useState(false);
    const [values, setValues] = useState({
      name: "",
      description: "",
      price: "",
      stock: "",
      photos: "",
      categories: [],
      category: "",
      loading: false,
      error: "",
      createdProduct: "",
      getaRedirect: false,
      formData: "",
    });
  
    const {
      name,
      description,
      price,
      stock,
      categories,
      category,
      loading,
      error,
      createdProduct,
      getaRedirect,
      formData,
    } = values;
  
    const preloadCategories = () =>{
      getCategories().then(data=>{
          if (data.error) {
              setValues({ ...values, error: data.error });
              console.log("category Data error = ", data.error);
            } else {
              setValues({ ...values, categories: data });
            }
            console.log("categories = ", categories);

      })
  }

    const preload = (productId) => {
      console.log("ProductId= ",productId);

      getProduct(productId).then((data) => {
        console.log(" Data = ", data);
        // preloadCategories();
        if (data?.error) {
          setValues({ ...values, error: data.error });
          console.log(" Data error = ", data.error);
        } else {
          preloadCategories();

            setValues({
                ...values,
                name:data.name,
                description:data.description,
                category:data.category._id,
                stock:data.stock,
                price:data.price,
                formData:new FormData()
            });

        }
      });
    };    
  
  
  
    useEffect(() => {
      preload(props.match.params.ProductId);
    }, []);
  

    //TODO:WORK ON IT
    const handleSubmit = (event) => {
      event.preventDefault();
      setValues({...values,error:"",loading:true})
      let ProductId = props.match.params.ProductId;
      let correctProductId = ProductId.substring(0, ProductId.length - 1);
      updateProduct(correctProductId,user._id,token,formData)
          .then((data)=>{
              if(data.error){
                  setValues({...values,error:data.error})
                  setSuccess(false);
              }
              else{
                  setValues({
                      ...values,
                      name:"",
                      description:"",
                      price:"",
                      photos:"",
                      stock:"",
                      loading:false,
                      createdProduct: data.name,
                      error:"",
                      getaRedirect:true
                      
                  })
                  setSuccess(true);
              }
          })
          .catch((err)=>{
              console.log(err);
          })
    };
  
    const handleChange = (name) => (event) => {
      
      const value = name ==="photos" ? event.target.files[0]:event.target.value;
      formData.set(name,value);
      setValues({...values,[name]:value})
    };

    const successMessage = () => {
        if(success){
          return (
              // <div className="alert alert-success my-3 mx-3" style={{display:createdProduct ? "" : "none"}}>
                  
                <h4 className="alert alert-success text-success"> {createdProduct} Updated successfully</h4>
            
              //   </div>
          );
        }
        
      
    };
  
    const warningMessage = () => {
      if (error) {
        return <h4 className="alert alert-warning text-warning">Failed to Update the Product.</h4>;
      }
    };
    const createProductForm = () => (
      <form>
        <span>Post photo</span>
        <div className="form-group mb-3">
          <label className="btn btn-block btn-success">
            <input
              onChange={handleChange("photos")}
              type="file"
              name="photos"
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div>
        <div className="form-group mb-3">
          <input
            onChange={handleChange("name")}
            name="name"
            className="form-control"
            placeholder="Name"
            value={name}
          />
        </div>
        <div className="form-group mb-3">
          <textarea
            onChange={handleChange("description")}
            name="description"
            className="form-control"
            placeholder="Description"
            value={description}
          />
        </div>
        <div className="form-group mb-3">
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            placeholder="Price"
            value={price}
          />
        </div>
        <div className="form-group mb-3">
          <select
            onChange={handleChange("category")}
            className="form-control"
            placeholder="Category"
          >
            <option>--Select--</option>
            { categories &&
              categories.map((categ,index)=>{
                  return <option key={index} value={categ._id}>{categ.name}</option>
              })
            }
            
          </select>
        </div>
        <div className="form-group mb-3">
          <input
            onChange={handleChange("stock")}
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={stock}
          />
        </div>
  
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-outline-success mb-3"
        >
          Update Product
        </button>
      </form>
    );
  
    return (
      <Base
        title="Update product here!"
        description="Welcome to product updation section"
        className="container bg-info p-4"
      >
        <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
          Admin Home
        </Link>
        
        <div className="row bg-dark text-white rounded">
          <div className="col-md-8 offset-md-2">
              {successMessage()}
              {warningMessage()}
              {createProductForm()}
          </div>
        </div>
      </Base>
    );
}

export default UpdateProduct
