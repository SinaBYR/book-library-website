import * as express from 'express';
import {
  renderHomePage,
  renderSignInPage,
  renderSignUpPage
} from '../controllers';

const router = express.Router();

router.get('/signup', renderSignUpPage);
router.get('/signin', renderSignInPage);
router.get('/', renderHomePage);

export default router;