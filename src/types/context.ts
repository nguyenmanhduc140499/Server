import { Request, Response } from "express";
interface Context {
  req: Request;
  res: Response;
  // user: | null;
}

export default Context;
