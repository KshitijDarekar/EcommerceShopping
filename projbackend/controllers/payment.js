const braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
environment: braintree.Environment.Sandbox,
  merchantId: "qgj7mwdp9khjswp2",
  publicKey: "fqx9q5rffwsm2s63",
  privateKey: "09f11c10e1ed7d66f5123d2170e97141"
}); 



exports.getToken = (req,res)=>{
    try{
    gateway.clientToken.generate({
      }, (err, response) => {
          if(err){
              res.status(500).send(err);
          }
          else{
              res.send(response)
          }
        // // pass clientToken to your front-end
        // const clientToken = response.clientToken
      });
      }catch(err){
      console.log(err)
      }
}

exports.processPayment = (req,res)=>{
let nonceFromTheClient = req.body?.paymentMethodNonce;

  let amountFromTheClient = req.body?.amount;
  gateway?.transaction?.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true
      }
    },
    function(err, result) {
      if (err) {
      console.log(err)
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  );

}