import { tiendanubeAuthClient, tiendanubeApiStore } from "@config";
import { BadRequestException } from "@utils";
import { userRepository } from "@repository";
import { TiendanubeAuthRequest, TiendanubeAuthInterface, TiendanubeStoreInterface } from "@features/auth";

class InstallAppService {
  public async install(code: string): Promise<TiendanubeAuthInterface> {
    if (!code) {
      throw new BadRequestException("The authorization code not found");
    }

    const body: TiendanubeAuthRequest = {
      client_id: process.env.CLIENT_ID as string,
      client_secret: process.env.CLIENT_SECRET as string,
      grant_type: "authorization_code",
      code: code,
    };        

    const authenticateResponse = await this.authenticateApp(body);

    // This condition will be true when the code has been used or is invalid.
    if (authenticateResponse.error && authenticateResponse.error_description) {
      throw new BadRequestException(
        authenticateResponse.error as string,
        authenticateResponse.error_description
      );
    }

    const storeInfoResponse = await this.getStoreInfo(authenticateResponse);
    userRepository.save(authenticateResponse,storeInfoResponse);
    authenticateResponse.shop = storeInfoResponse.url_with_protocol;
    return authenticateResponse;
  }



  private async authenticateApp(
    body: TiendanubeAuthRequest
  ): Promise<TiendanubeAuthInterface> {
    //return await tiendanubeAuthClient.post("/", body);
    return await tiendanubeAuthClient.request({
      method:'POST',
      headers:{
        "Content-Type": "application/json"
      },
      data:body
    });
  }


  private async getStoreInfo(
    body: TiendanubeAuthInterface
  ):Promise<TiendanubeStoreInterface>
  {
    const {user_id,access_token} = body;
    return tiendanubeApiStore.request({
      url:`/${user_id}/store?fields`,
      method:'GET',
      headers:{
        "Content-Type": "application/json",
        "Authentication": `bearer ${access_token}`
      }
    });
  }
}

export default new InstallAppService();
