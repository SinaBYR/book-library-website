import * as express from 'express';
import { register, login } from '../controllers';
import * as validate from '../middleware/validate';
import { authRouteErrorHandler, handleAuthError } from '../middleware/error';

const router: express.Router = express.Router();

router.post('/login', validate.validateLogin,login);
router.post('/register', validate.validateRegister, register);
router.use(handleAuthError);
router.use(authRouteErrorHandler);

export default router;