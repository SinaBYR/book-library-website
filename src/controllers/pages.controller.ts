import { Request, Response } from "express";

export function renderHomePage(req: Request, res: Response) {
  res.render('pages/home/page');
}