const CryptoJS = require('crypto-js');

/**
 * Client to interface with the Payments Apps Epayco API.
 */
export default class PaymentsAppsEpayco {
    BASE_URL_APIFY = process.env.BASE_URL_APIFY ? process.env.BASE_URL_APIFY :"https://apify.epayco.io";
    publicKey: string;
    privateKey: string;
    lang: string;
    test: string;
    accessToken: string;
    constructor(options:any) {
        this.publicKey = options.publicKey;
        this.privateKey = options.privateKey;
        this.lang = options.lang;
        this.test = options.test ? 'TRUE' : 'FALSE';
        const encoded = CryptoJS.enc.Utf8.parse(`${this.publicKey}:${this.privateKey}`); 
        const token = CryptoJS.enc.Base64.stringify(encoded);
        this.accessToken = `Basic ${token}`;
      }


      /**
     * Generic sessionToken resolution function
     * @returns the response body from the ePayco API
     */
    async sessionToken() {
        const response = await this.#perform([], 'login');
        return response;
    }

    /**
     * Generic session resolution function
     * @param {*} paymentSession the paymentSession to resolve payment
     * @returns the response body from the ePayco API
     */
    async charge(payload:any) {
        const response = await this.#perform(payload, '/payment/process');
        return response;
    }


    /**
   * Client perform function. Calls ePayco API.
   * @param {*} query the query to run
   * @param {*} path 
   * @returns
   */
    async #perform(query:any, path:string) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': this.accessToken
          }
    
        const response = await fetch(this.BASE_URL_APIFY+`/${path}`, {
          method: 'POST',
          headers,
          body: JSON.stringify(query)
        })
        console.log(`[apify] Making request for path: "${path}"`)
    
        const responseBody = await response.json();
        console.log(`[apify] response: ${JSON.stringify(responseBody)}`);
    
        return response.ok ? responseBody : null
      }


}