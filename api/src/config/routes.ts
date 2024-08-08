import { Router } from "express";
import { AuthenticationController } from "../features/auth";
import { PaymentController } from "../features/payment";
import { checkUserCredentialsMiddleware } from "../middlewares";
//const payment = require('../payment.js');

const routes = Router();
routes.get("/auth/install", AuthenticationController.install);
routes.post("/auth/login", AuthenticationController.login);
routes.get("/ping", (req,res) => (res.status(200).send("ePayco"))); 
routes.post("/payment", (req,res) => (res.status(200).json(req.body))); 
routes.param("user_id", checkUserCredentialsMiddleware);
routes.get("/:user_id/payment_providers", PaymentController.getPayment);
routes.post("/:user_id/payment_providers", PaymentController.create);

export default routes;
