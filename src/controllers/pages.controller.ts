import { Request, Response } from "express";

export function renderSignUpPage(req: Request, res: Response) {
  res.render('pages/signup/page');
}

export function renderSignInPage(req: Request, res: Response) {
  res.render('pages/signin/page');
}

export function renderHomePage(req: Request, res: Response) {
  res.render('pages/home/page');
}
