import { NextFunction, Request, Response } from "express";
import userRepository from "../repository/UserRepository";

export const checkUserCredentialsMiddleware = async (
  _req: Request,
  res: Response,
  next: NextFunction,
  user_id: number
): Promise<Response | void>  => {
  try {
    const result = await userRepository.findOne(+user_id);
    _req.body = result;
    next();
  } catch (e) {
    next(e);
  }
};
