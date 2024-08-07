import { tiendanubeApiClient } from "@config";
import {IPaymentResponse} from "./interface/payment.interface";

class PaymentService{

    async create(user_id: number, access_token: string ): Promise<IPaymentResponse> {

        const data: IPaymentResponse = await tiendanubeApiClient.request({
            url:`${user_id}/payment_providers`,
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                "Authentication": `bearer ${access_token}`
            },
            data: this.getPaymentdata()
        });

    
        return {
          id: data.id
        } as IPaymentResponse;
    }

    async findAll(user_id: number, access_token: string){
      const data: IPaymentResponse =  await tiendanubeApiClient.request({
            url:`${user_id}/payment_providers`,
            method:'GET',
            headers:{
                "Content-Type": "application/json",
                "Authentication": `bearer ${access_token}`
            }
        });
        return {
          id: data.id
        } as IPaymentResponse;
    }


    private getPaymentdata(){
        return {
            "name": "Credit card - Paga con ePayco",
            "public_name": "Credit card - Paga con ePayco",
            "description": "ePayco es una compañía tecnológica que brinda una solución de pagos y recaudos integral a personas, empresas e instituciones, resolviendo todas sus necesidades de vender y recaudar a través de internet con las mejores gestiones y experiencia para sus clientes.",
            "logo_urls": {
              "400x120": "https://tiendanube.epayco.co/alerts-icons/logoepayco.svg",
              "160x100": "https://tiendanube.epayco.co/alerts-icons/logoepayco.svg"
            },
            "configuration_url": "https://dashboard.epayco.com/",
            "support_url": "https://epayco.com/contacto/",
            "rates_url": "https://epayco.com/tarifas/",
            "checkout_js_url": "https://mypayments.com/checkout.min.js",
            "supported_currencies": [
              "COP",
              "USD"
            ],
            "supported_payment_methods": [
              {
                "payment_method_type": "credit_card",
                "payment_methods": [
                  "visa",
                  "mastercard",
                  "amex",
                  "diners"
                ],
                "installments": {
                  "min_installment_value": [
                    {
                      "currency": "COP",
                      "value": "0.00"
                    }
                  ],
                  "specification": [
                    {
                      "installments": 1,
                      "interest_rate": "0.00",
                      "applies_to": [
                        "amex",
                        "diners",
                        "mastercard",
                        "visa"
                      ]
                    }
                  ]
                }
              }
            ],
            "rates": [
              {
                "payment_method_type": "credit_card",
                "rates_definition": [
                  {
                    "percent_fee": "2.99",
                    "flat_fee": {
                      "value": "900.00",
                      "currency": "COP"
                    },
                    "plus_tax": true,
                    "days_to_withdraw_money": 3
                  },
                  {
                    "percent_fee": "2.68",
                    "flat_fee": {
                      "value": "900.00",
                      "currency": "COP"
                    },
                    "plus_tax": true,
                    "days_to_withdraw_money": 3
                  }
                ]
              }
            ],
            "checkout_payment_options": [
              {
                "id": "epayco_credit_card",
                "name": "Credit card - Paga con ePayco",
                "description": "ePayco payment method for credit card",
                "logo_url": "https://tiendanube.epayco.co/alerts-icons/logoepayco.svg",
                "supported_billing_countries": [
                  "AR",
                  "BO",
                  "BR",
                  "BQ",
                  "CL",
                  "CO",
                  "EC",
                  "FK",
                  "GF",
                  "GY",
                  "PY",
                  "PE",
                  "GS",
                  "SR",
                  "UY",
                  "VE",
                  "CA",
                  "US"
                ],
                "supported_payment_method_types": [
                  "credit_card"
                ]
              }
            ],
            "features": [
              "supports_international_payments",
              "gateway"
            ],
            "enabled": true
          }
    }
           
        
}

export default new PaymentService();