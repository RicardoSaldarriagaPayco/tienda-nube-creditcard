import { tiendanubeApiClient } from "../../config";
import {IPaymentResponse, IOrderResponse, IProducts} from "./interface/payment.interface";
import { userRepository } from "../../repository";
import PaymentsAppsEpayco from "./epayco.service";

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
            "checkout_js_url": "https://plugins.epayco.io/develop/payment.js",
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
                      "installments": 48,
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

    async getCreditcard(creditCard:any){
      const user_id = creditCard.storeId;
      const orderId = creditCard.orderId;
      const user =  await userRepository.getCredentials(user_id);
      const session =  await userRepository.findOne(user_id);
      const access_token  = session?.access_token

      const order:IOrderResponse =  await tiendanubeApiClient.request({
        url:`${user_id}/orders/${orderId}`,
        method:'GET',
        headers:{
            "Content-Type": "application/json",
            "Authentication": `bearer ${access_token}`
        }
      });
      const {products, contact_email, gateway, language, payment_status, updated_at, landing_url} = order
      var description:any = [];
      products.forEach(product => {
        description.push(product.name)
      });
      const products_descriptions = description.join(", ");
      var date = new Date().getTime();
      const ip = await this.getIp();
      const lang = language;
      const cardNumber = creditCard.card.number.toString();
      const cardExpYear = "20"+creditCard.card.expiration.toString().split("/")[1];
      const cardExpMonth = creditCard.card.expiration.toString().split("/")[0];
      const cardCvc = creditCard.card.cvv.toString();
      const name = creditCard.card.name.split(" ")[0];
      const lastName = creditCard.card.name.split(" ")[1];
      const country_code = creditCard.billingAddress.country;
      const city = creditCard.billingAddress.city;
      const address = creditCard.billingAddress.address;
      const cellPhone = creditCard.card.cardHolderPhone.toString();
      const phone = creditCard.billingAddress.phone?creditCard.billingAddress.phone:cellPhone;
      const docNumber = creditCard.card.cardHolderIdNumber.toString();
      const docType = creditCard.card.cardHolderIdType.toString();
      const invoiceOrder = orderId.toString()+date;
      const value = creditCard.total.toString();
      const currency = creditCard.currency;
      const test = user?.modo === 'test' ? true:false;
      const urlConfirmation = this.comfirm_url(user_id, orderId);
      const methodConfirmation	= 'POST';
      const extras_epayco = {"extra5":"P300"}
      const payment:IPaymentResponse[] =  await tiendanubeApiClient.request({
        url:`${user_id}/payment_providers`,
        method:'GET',
        headers:{
            "Content-Type": "application/json",
            "Authentication": `bearer ${access_token}`
        }
      });
      var payment_id;
      payment.forEach(payment_ => {
        payment_id = payment_.id
      })
      const payload = { 
        email:contact_email,
        name,
        lastName,
        country:country_code,
        city,
        address,
        cellPhone,
        phone,
        invoice:invoiceOrder,
        value,
        currency,
        docNumber,
        docType,
        cardNumber,
        cardExpYear,
        cardExpMonth,
        cardCvc,
        dues: creditCard.card.installments,
        testMode: test,
        urlConfirmation,
        methodConfirmation,
        description:products_descriptions,
        lang,
        ip,
        extras_epayco,
        extra1:payment_id,
        extra2:updated_at,
        extra3:orderId.toString()
      };
      const epayco = new PaymentsAppsEpayco({publicKey: user?.publicKey,privateKey: user?.privateKey, lang: lang, test: test});
      const {token} = await epayco.sessionToken();
      epayco.accessToken= `Bearer ${token}`;
      const {success, data} = await epayco.charge(payload);
      if(!success){
        return await{
          "returnUrl":creditCard.callbackUrls.cancel,
          "success":false
        };
      }else{
        const {transaction} = data;
        const {franquicia, ref_payco, fecha, autorizacion} = transaction.data;
        const estado = transaction.data.estado.toLowerCase()
        await this.uploadOrderStatus(estado, payment_status, ref_payco, fecha, franquicia, autorizacion, payment_id, value, currency, updated_at, user_id, orderId, access_token);

        if(estado =='aceptada'
          ||estado =='pendiente'
          ||estado =='retenido'
          ||estado =='iniciada'
        ){
          return await{
            "returnUrl":creditCard.callbackUrls.success,
            "success":true
          };
        }else{
          return await{
            "returnUrl":creditCard.callbackUrls.cancel,
            "success":false
          };
        }
      }
    }

    private async processPayment(user_id:string, orderId:string, access_token:any, query:any) {
      const url = `${user_id}/orders/${orderId}/transactions`;
      try{
        const payment =  await tiendanubeApiClient.request({
          url:url,
          method:'POST',
          headers:{
              "Content-Type": "application/json",
              "Authentication": `bearer ${access_token}`
          },
          data: query
        });
        console.log(`processPayment: ${JSON.stringify(payment)}`)
        return payment;
      } catch (e) {
        console.log(`processPayment Error url:${url},accesstoken:${access_token} : ${JSON.stringify(e)}`)
      }
     
    }

    private async getIp() {
      return await fetch('https://api.ipify.org/?format=json')
        .then(res => res.json())
        .then(data => data.ip);
    }

     /**
     * Generic sessionToken resolution function
     * @returns the response body from the ePayco API
     */
     async sessionToken(accessToken:string) {
      const response = await this.#perform([], 'login', accessToken);
      return response;
  }

  
    /**
   * Client perform function. Calls ePayco API.
   * @param {*} query the query to run
   * @param {*} path 
   * @returns
   */
    async #perform(query:any, path:string, accessToken:string) {
      const BASE_URL_APIFY = process.env.BASE_URL_APIFY || 'https://apify.epayco.io';
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': accessToken
        }
  
      const response = await fetch(BASE_URL_APIFY+`/${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(query)
      })
      console.log(`[apify] Making request for path: "${path}"`)
  
      const responseBody = await response.json();
      console.log(`[apify] response: ${JSON.stringify(responseBody)}`);
  
      return response.ok ? responseBody : null
    }

    private comfirm_url(user_id:string, orderId:string) {
      const API_URL = process.env.API_URL || 'https://tienda-nube-tdc-api.epayco.io';
      return`${API_URL}/${user_id}/confirmation/${orderId}`;

    }

    private getFranchise(franchise:string){
      switch (franchise) {
        case "VS":
            return "visa"
          break;
        case "CR":
        case "AM":  
         return "amex"
          break;
        case "DC":
          return "diners"
          break;
        case "MC":
          return "mastercard"
          break;
      }
    }

    private handlePayment(payment_id:any,franquicia:string,value:string, currency:string, status_payment:any,updated_at:string){
      var orderDate_explode = updated_at.split('+');
      return {
        "payment_provider_id":payment_id,
        "payment_method":{
          type:"credit_card",
          id: this.getFranchise(franquicia)
        },
        info:{
          installments:{
            quantity:1,
            interest:"0.0"
          }
        },
        first_event:{
          amount:{
            value,
            currency
          },
          type:"sale",
          status:status_payment,
          happened_at:orderDate_explode[0] + "z"
        }
      }
    }

    private async updateOrderNote(user_id:string, orderId:string, access_token:any, query:any) {
      const url = `${user_id}/orders/${orderId}`;
      try{
        const payment =  await tiendanubeApiClient.request({
          url:url,
          method:'PUT',
          headers:{
              "Content-Type": "application/json",
              "Authentication": `bearer ${access_token}`
          },
          data: query
        });
        console.log(`updateOrderNote: ${JSON.stringify(payment)}`)
        return payment;
      } catch (e) {
        console.log(`updateOrderNote Error, url:${url},accesstoken:${access_token} : ${JSON.stringify(e)}`)
      }
    }

    private async uploadOrderStatus(
      estado:string,
      payment_status:string,
      ref_payco: any,
      fecha:string,
      franquicia:string,
      autorizacion: string,
      payment_id: any,
      value: string,
      currency: string,
      updated_at: string,
      user_id: string,
      invoice: any,
      access_token: any
    ){
      var status_payment;
        switch (estado) {
          case "aceptada":
            status_payment='pending'
            if(payment_status =='pending'
              ||payment_status =='voided'){
                status_payment='paid'
                const order_note ={
                  owner_note:`Pago con ePayco, \nref_payco: ${ref_payco} \nFecha y hora transacción: ${fecha} \nFranquicia/Medio de pago: ${franquicia} \nCódigo de autorización: ${autorizacion}`,
                  status:'pending'  
                }
                const dataPayment = this.handlePayment(payment_id,franquicia,value,currency,'pending',updated_at);
                await this.processPayment(user_id,invoice,access_token,dataPayment);
                await this.updateOrderNote(user_id,invoice,access_token,order_note);
                const order_note_completed ={
                  owner_note:`Pago con ePayco, \nref_payco: ${ref_payco} \nFecha y hora transacción: ${fecha} \nFranquicia/Medio de pago: ${franquicia} \nCódigo de autorización: ${autorizacion}`,
                  status:status_payment  
                }
                //const dataPaymentCompleted = this.handlePayment(payment_id,franquicia,value,currency,status_payment,updated_at);
                //await this.processPayment(user_id,invoice,access_token,dataPaymentCompleted);
                await this.updateOrderNote(user_id,invoice,access_token,order_note_completed);
            }
            break;
          case "pendiente":
          case "retenido":
          case "iniciada":
            status_payment='pending'
            const order_note_pending ={
              owner_note:`Pago con ePayco, \nref_payco: ${ref_payco} \nFecha y hora transacción: ${fecha} \nFranquicia/Medio de pago: ${franquicia} \nCódigo de autorización: ${autorizacion}`,
              status:status_payment  
            }
            const dataPaymentPending = this.handlePayment(payment_id,franquicia,value,currency,status_payment,updated_at);
            await this.processPayment(user_id,invoice,access_token,dataPaymentPending);
            await this.updateOrderNote(user_id,invoice,access_token,order_note_pending);
            break;
          default:
            status_payment='error'
            const order_note_cancel ={
              owner_note:`Pago con ePayco, \nref_payco: ${ref_payco} \nFecha y hora transacción: ${fecha} \nFranquicia/Medio de pago: ${franquicia} \nCódigo de autorización: ${autorizacion}`,
              status:status_payment  
            }
            const dataPaymentCancel = this.handlePayment(payment_id,franquicia,value,currency,status_payment,updated_at);
            await this.processPayment(user_id,invoice,access_token,dataPaymentCancel);
            await this.updateOrderNote(user_id,invoice,access_token,order_note_cancel);
        }

    }

    async uploadPayment(creditCard:any){
      const {user_id,order_id,access_token,x_extra1,x_extra2, x_respuesta, x_franchise, x_ref_payco, x_fecha_transaccion, x_approval_code} = creditCard;
      const order:IOrderResponse =  await tiendanubeApiClient.request({
        url:`${user_id}/orders/${order_id}`,
        method:'GET',
        headers:{
            "Content-Type": "application/json",
            "Authentication": `bearer ${access_token}`
        }
      });
      const { payment_status, updated_at, total, currency} = order
      const estado = x_respuesta.toLowerCase()
      await this.uploadOrderStatus(estado, payment_status, x_ref_payco, x_fecha_transaccion, x_franchise, x_approval_code, x_extra1, total, currency, updated_at, user_id, order_id, access_token);
      return {"status":estado};
    }
        
}

export default new PaymentService();
