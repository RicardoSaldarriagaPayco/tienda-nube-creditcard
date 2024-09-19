import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../utils";
import PaymentService from "./payment.service";
//import { ProductService } from "@features/product";

class PaymentController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const access_token = req.body.access_token;
      const data = await PaymentService.create(+req.params.user_id, access_token);
      return res.status(StatusCode.CREATED).json(data);
    } catch (e) {
      next(e);
    }
  }


  async getPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
        const access_token = req.body.access_token;
        const user_id = +req.params.user_id?+req.params.user_id:req.body.access_token;
        const data = await PaymentService.findAll(user_id, access_token);
      return res.status(StatusCode.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  async payment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const data = JSON.stringify(req.body);
      const datas = await PaymentService.getCreditcard(JSON.parse(data));
      //res.redirect(datas.returnUrl)
      return res.status(StatusCode.CREATED).json(datas);
    } catch (e) {
      next(e);
    }
  }

  async confirmation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const user_id = +req.params.user_id?+req.params.user_id:req.body.user_id;
      const order_id = +req.params.order_id?+req.params.order_id:req.body.order_id;
      const body = Object.assign(req.body, {user_id, order_id});
      const data = JSON.stringify(body);
      const datas = await PaymentService.uploadPayment(JSON.parse(data));
      return res.status(StatusCode.CREATED).json(datas);
    } catch (e) {
      next(e);
    }
  }


}

export default new PaymentController();
