import { Request, Response } from "express";

export function renderHomePage(req: Request, res: Response) {
  res.render('pages/home/page');
}

export function renderSignInPage(req: Request, res: Response) {
  res.render('pages/signin/page');
}