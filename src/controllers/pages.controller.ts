import { Request, Response } from "express";
import { getRandomQuote, getTopSubjects, getTrendingBooks } from "../services";
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
  const trendingBooks = await getTrendingBooks();
  const topSubjects = await getTopSubjects();
  const quote = await getRandomQuote();
  res.render('pages/home/page', {
    user: req.user,
    data: {
      trendingBooks,
      topSubjects,
      quote
    }
  });
})
