export interface LoginRequestInterface {
  user_id: number;
  client_id: number;
  config: {
    user_id: number;
    client_id: number;
    pCustId: string;
    publicKey: string;
    privateKey: string;
    pKey: string;
  };
}
