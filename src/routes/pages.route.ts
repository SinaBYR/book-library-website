import * as express from 'express';
import {
  renderHomePage,
  renderSignInPage
} from '../controllers/pages.controller';

const router = express.Router();

router.get('/', renderHomePage);
router.get('/signin', renderSignInPage);

export default router;