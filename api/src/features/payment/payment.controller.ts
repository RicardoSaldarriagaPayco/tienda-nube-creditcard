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
        const data = await PaymentService.findAll(+req.params.user_id, access_token);
      return res.status(StatusCode.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

}

export default new PaymentController();
