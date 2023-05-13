import * as express from 'express';
import { register } from '../controllers';
import { validateRegister } from '../middleware/validate';
import { authRouteErrorHandler } from '../middleware/error';

const router: express.Router = express.Router();

router.post('/register', validateRegister, register);
router.use(authRouteErrorHandler);

export default router;