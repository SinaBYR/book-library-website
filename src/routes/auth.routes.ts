import * as express from 'express';
import { register } from '../controllers';
import { validateRegister } from '../middleware/validate';
import { authRouteErrorHandler } from '../middleware/error';

const app: express.Router = express.Router();

app.post('/register', validateRegister, register);
app.use(authRouteErrorHandler);

export default app;