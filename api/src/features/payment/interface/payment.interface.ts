export interface IPaymentResponse {
    id: string;
}

export interface IOrderResponse{
  id: number,
  token: string,
  store_id: string,
  contact_email: string,
  currency: string,
  language:string,
  gateway: string,
  payment_status: string,
  landing_url:string,
  total:string,
  updated_at:string,
  products:IProducts[]
}

export interface IProducts{
  id:Number,
  name:string
}