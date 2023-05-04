import * as express from 'express';
import pagesRoute from './pages.route';
const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: pagesRoute
  }
];

defaultRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;