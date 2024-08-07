import jsonServer from "json-server";
import prisma from "src/config/tiendanube-db.client";
import path from "path";
import { TiendanubeAuthInterface, LoginRequestInterface, TiendanubeStoreInterface } from "@features/auth";
import { HttpErrorException } from "@utils";
import { da } from "@faker-js/faker";


interface IDatabase {
  Session: TiendanubeAuthInterface[];
}



class UserRepository {
  save(credential: TiendanubeAuthInterface, store: TiendanubeStoreInterface) {
    this.createOrUpdate(credential, store);
  }

  async findOne(user_id: number) {
    try{
      const store = await prisma.session.findFirst({
        where: { user_id }
      })
      return store;
    } catch (error) {
      console.error('Error al hacer findOne:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  async findFirst(data:LoginRequestInterface){
    try{  
      const {user_id} = data.config ;

      const configuration = await prisma.session.findFirst({
        where: { user_id }
      });
      if(data){
        this.createOrUpdateRedential(data, configuration)
      }
      return configuration;
    } catch (error) {
      console.error('Error al hacer findFirst:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  private async createOrUpdate(data: TiendanubeAuthInterface, store: TiendanubeStoreInterface) {
    try{
      const { access_token, token_type, scope, user_id } = data;
      const {url_with_protocol} = store; 

      var tiendanube_tdc_session = await prisma.session.findFirst({
        where: { user_id }
      })
      if(tiendanube_tdc_session){
        await prisma.session.update({
          where: { user_id },
          data:{  
            access_token,
            token_type,
            scope: scope
          }
        })
      }else{
        await prisma.session.create({
          data: {
            access_token,
            token_type,
            scope: scope,
            user_id,
            shop: url_with_protocol
          }
        })
      }
    } catch (error) {
      console.error('Error al hacer createOrUpdate:', error);
    } finally {
      await prisma.$disconnect();
    }
  }

  private async createOrUpdateRedential(data: LoginRequestInterface, configuration:any) {
   try{
    const { pCustId, publicKey, privateKey, pKey} = data.config;
    const { user_id } = configuration;
    const result = await prisma.tiendanubeTdcCredentials.upsert({
      where: { user_id }, // Condition to find the record
      update: {
        pCustId, // Fields to update if the record exists
        publicKey,
        privateKey,
        pKey,
      },
      create: {
        user_id, // User ID
        pCustId,
        publicKey,
        privateKey,
        pKey,
      },
    });

    console.log('Resultado del upsert:', result);
    } catch (error) {
      console.error('Error al hacer createOrUpdateRedential:', error);
    } finally {
      await prisma.$disconnect();
    }

  }
}

export default new UserRepository();
