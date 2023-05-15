import * as express from 'express';
import { register, login, logout, logoutAll } from '../controllers';
import * as validate from '../middleware/validate';
import { handleValidationError, handleAuthError } from '../middleware/error';

const router: express.Router = express.Router();

router.post('/logout-all', logoutAll);
router.post('/logout', logout);
router.post('/login', validate.validateLogin, login);
router.post('/register', validate.validateRegister, register);
router.use(handleValidationError);
router.use(handleAuthError);
router.use('*', (_, res) => res.redirect('/signin'));

export default router;