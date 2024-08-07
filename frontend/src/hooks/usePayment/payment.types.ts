interface ISupportedPaymentMethodTypes {
    credit_card: string;
  }
  
  interface IPaymentOption {
    id: string;
    name: string;
    description: string;
    supported_payment_method_types: ISupportedPaymentMethodTypes[];
  }
  
  export interface IPayment {
    id: number;
    appId: number;
    enabled: boolean;
    checkout_payment_options?: IPaymentOption[];
  }
  
  export interface IProductsDataProvider {
    children: (data: {
      payments: IPayment[];
      onDeleteProduct: (paymentId: number) => void;
    }) => React.ReactNode;
  }
  