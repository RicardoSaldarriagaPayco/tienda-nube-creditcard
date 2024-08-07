LoadCheckoutPaymentContext(function(Checkout, PaymentMethods) {
  var TransparentCard = PaymentOptions.Transparent.CardPayment({
      id: "epayco_credit_card",
      
      version: 'v1',
      
      onSubmit: function(callback) {
          let acmeRelevantData = {
              orderId: Checkout.getData("order.cart.id"),
              currency: Checkout.getData("order.cart.currency"),
              total: Checkout.getData("order.cart.prices.total"),
              storeId: Checkout.getData('storeId'),
              billingAddress: Checkout.getData('order.billingAddress'),
              shippingAddress: Checkout.getData('order.shippingAddress'),
              payment: Checkout.getData('form'),
              urlResponseSession: window.location.pathname.split("/")[2],
              card: {
                  number: Checkout.getData("form.cardNumber"),
                  name: Checkout.getData("form.cardHolderName"),
                  expiration: Checkout.getData("form.cardExpiration"),
                  cvv: Checkout.getData("form.cardCvv"),
                  installments: Checkout.getData("form.cardInstallments"),
              },
          };

          Checkout.http
              .post("http://localhost:3000/payment", acmeRelevantData)
              .then(function(responseBody) {
                  if (responseBody.data.success) {
                      callback({
                          success: true,
                      });
                  } else {
                      callback({
                          success: false,
                          error_code: responseBody.data.error_code,
                      });
                  }
              })
              .catch(function(error) {
                  callback({
                      success: false,
                      error_code: "payment_processing_error",
                  });
              });
      }
  });
  
  Checkout.addPaymentOption(TransparentCard);
});