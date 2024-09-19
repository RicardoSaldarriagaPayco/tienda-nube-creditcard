LoadCheckoutPaymentContext(function(Checkout, PaymentOptions) {
    var TransparentCard = PaymentOptions.Transparent.CardPayment({
        id: "epayco_credit_card",
        version: 'v1',
        fields: {
          card_holder_id_number: true,
          card_holder_phone: true,
          card_holder_id_types: [
              {
                  code: 'NIT',
                  name: 'NIT'
              },
              {
                  code: 'CC',
                  name: 'CC'
              },
              {
                  code: 'CE',
                  name: 'CE'
              },
              {
                  code: 'TI',
                  name: 'TI'
              },
              {
                  code: 'PPN',
                  name: 'PPN'
              },
              {
                  code: 'SSN',
                  name: 'SSN'
              },
              {
                  code: 'LIC',
                  name: 'LIC'
              },
              {
                  code: 'DNI',
                  name: 'DNI'
              }
          ]
        },
        onSubmit: function(callback) {
            let acmeRelevantData = {
                orderId: Checkout.getData("order.cart.id"),
                hash: Checkout.getData("order.cart.hash"),
                currency: Checkout.getData("order.cart.currency"),
                lang: Checkout.getData("order.cart.lang"),
                total: Checkout.getData("order.cart.prices.total"),
                storeId: Checkout.getData('storeId'),
                billingAddress: Checkout.getData('order.billingAddress'),
                shippingAddress: Checkout.getData('order.shippingAddress'),
                contact: Checkout.getData('order.contact'),
                callbackUrls:Checkout.getData('callbackUrls'),
                payment: Checkout.getData('form'),
                urlResponseSession: window.location.pathname.split("/")[2],
                card: {
                    number: Checkout.getData("form.cardNumber"),
                    name: Checkout.getData("form.cardHolderName"),
                    expiration: Checkout.getData("form.cardExpiration"),
                    cvv: Checkout.getData("form.cardCvv"),
                    installments: Checkout.getData("form.cardInstallments"),
                    cardHolderIdNumber: Checkout.getData("form.cardHolderIdNumber"),
                    cardHolderPhone: Checkout.getData("form.cardHolderPhone"),
                    cardHolderIdType: Checkout.getData("form.cardHolderIdType")
                },
            };
  
            Checkout.http
                .post("https://tienda-nube-tdc-api.epayco.io/payment", acmeRelevantData)
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