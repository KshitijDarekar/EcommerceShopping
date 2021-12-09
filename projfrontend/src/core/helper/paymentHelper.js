const { API } = require("../../backend");

export const getMeToken = (userId, tokenNonce) => {
  return fetch(`${API}/payment/gettoken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenNonce}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const processPayment = (userId, tokenNonce, paymentInfo) => {
  return fetch(`${API}/payment/gateway/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenNonce}`,
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
