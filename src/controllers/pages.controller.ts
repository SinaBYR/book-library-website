import { Request, Response } from "express";
import { getRandomQuote, getTopSubjects, getTrendingBooks } from "../services";
import catchAsync from "../utils/catchAsync";
import { result } from '../../temp';
import { getWork } from "../services/openlib.service";

export const renderWorkPage = catchAsync(async (req: Request, res: Response) => {
  const work = await getWork(req.params.bookId);

  console.log(work);
  res.render('pages/work/page', {
    user: req.user,
    data: {
      work
    }
  });
})


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
  // const trendingBooks = await getTrendingBooks();
  // const topSubjects = await getTopSubjects();
  // const quote = await getRandomQuote();

  // console.log(topSubjects);
  res.render('pages/home/page', {
    user: req.user,
    data: {
      // trendingBooks: trendingBooks.works,
      // topSubjects: topSubjects.docs,
      // quote
      trendingBooks: result.works
    }
  });
})
