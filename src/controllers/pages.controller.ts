import { Request, Response } from "express";
import { getTrendingBooks } from "../services";
import catchAsync from "../utils/catchAsync";

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

export const renderHomePage = catchAsync(async (req: Request, res: Response) => {
  const data = await getTrendingBooks();
  res.render('pages/home/page', {
    user: req.user,
    data
  });
})
