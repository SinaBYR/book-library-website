import * as express from 'express';
import {
  renderHomePage,
  renderSignInPage,
  renderSignUpPage
} from '../controllers';
import { handleHttpResponseError } from '../middleware/error';

const router = express.Router();

router.get('/signup', renderSignUpPage);
router.get('/signin', renderSignInPage);
router.get('/', renderHomePage);
router.use(handleHttpResponseError);

export default router;