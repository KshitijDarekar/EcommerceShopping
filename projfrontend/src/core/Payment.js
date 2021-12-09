import React, { useState, useEffect } from "react";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getMeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

function Payment({ products, setReload = (f) => f, reload = undefined }) {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance:{}
  });
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      console.log("Hello there ");
      console.log("Get me info ", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const onPurchase =()=>{
      setInfo({loading:true});
      let nonce;
      let getNonce = info.instance
            .requestPaymentMethod()
            .then(data=>{
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce : nonce,
                    amount : getAmount()
                };
                processPayment(userId,token,paymentData)
                .then(response=>{
                    setInfo({...info,success:response.success,loading:false})
                    console.log("Payment Success");
                    const orderData = {
                      products:products,
                      transaction_id:response.transaction.id,
                      amount:response.transaction.amount

                    }
                    createOrder(userId,token,orderData);
                    //EMPTY THE CART
                    cartEmpty(()=>{
                      console.log("Did we crash the Party ?")
                    })
                    //FORCE RELOAD
                    setReload(!reload);
                })
                .catch(error=>{
                    setInfo({loading:false,success:false});
                    console.log("Payment Failed");
                })
            })
  }
  const getAmount = ()=>{
      let amount =0;
      products.map(p=>{
          amount =amount+ p.price;
      })
      return amount;
  }

  const dropIn = ()=>{
      return (
          <div>
              { (info.clientToken !== null && products.length> 0) ? (
                <div>
                <DropIn
                options={{ authorization: info.clientToken }}
                onInstance={(instance) => (info.instance = instance)}
                />
                <button className = "btn btn-block btn-success"
                onClick={onPurchase}>
                    Buy
                    </button>
            </div>
                  )
                   : (<h3>Please Login or Add Something to Cart</h3>) 
                   }
          </div>
      );
  }



  return (
    <div>
      <h3>Test Payment Gateway , Your bill is ${getAmount()}</h3>
      {dropIn()}
    </div>
  );
}

export default Payment;
