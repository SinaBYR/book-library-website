import * as express from 'express';
import pagesRoute from './pages.route';
import authRoutes from './auth.routes';
const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: pagesRoute
  },
  {
    path: '/auth',
    route: authRoutes
  }
];

defaultRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;