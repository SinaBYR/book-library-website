import { Request, Response } from "express";
import { createNewUser } from "../services";
import { RegisterReqBody } from "./types";

export async function register(req: Request<{}, {}, RegisterReqBody>, res: Response) {
  await createNewUser(req.body);
}