import React, { useState, useEffect } from "react";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router";

function Card({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = f => f,  //function(f){return f}
  reload = undefined,
}) {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "A photo from Pexels";
  const cardDescription = product ? product.description : "Looks good";
  const cardPrice = product ? product.price : "50";

  const ToCart = () => {
    // metod to call addItemToCart
    addItemToCart(product, () => {
      return setRedirect(true);
    });
  };

  const getRedirect = (redirect) => {
    //After clicking on add to Cart redirect user to cart page
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={ToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getRedirect(redirect)}
        <div className="rounded border border-success p-2">
          <ImageHelper product={product} />
        </div>
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
