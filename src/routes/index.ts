import * as express from 'express';
import pagesRoute from './pages.route';
import authRoutes from './auth.routes';
import { auth } from '../middleware/auth';
const router = express.Router();

router.use(auth);

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