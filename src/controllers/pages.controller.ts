import { Request, Response } from "express";

export function renderSignUpPage(req: Request, res: Response) {
  if(req.user) {
    return res.redirect('/');
  }

  res.render('pages/signup/page');
}

export function renderSignInPage(req: Request, res: Response) {
  if(req.user) {
    return res.redirect('/');
  }

  res.render('pages/signin/page');
}

export function renderHomePage(req: Request, res: Response) {
  res.render('pages/home/page', {
    user: req.user
  });
}
