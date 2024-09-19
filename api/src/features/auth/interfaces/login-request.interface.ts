export interface LoginRequestInterface {
  user_id: number;
  client_id: number;
  form: {
    user_id: number;
    client_id: number;
    pCustId: string;
    publicKey: string;
    privateKey: string;
    pKey: string;
    modo: string;
  };
}
