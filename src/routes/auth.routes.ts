import * as express from 'express';
import { register, login } from '../controllers';
import { validateRegister } from '../middleware/validate';
import { authRouteErrorHandler, handleAuthError } from '../middleware/error';

const router: express.Router = express.Router();

router.post('/login', login);
router.post('/register', validateRegister, register);
router.use(handleAuthError);
router.use(authRouteErrorHandler);

export default router;