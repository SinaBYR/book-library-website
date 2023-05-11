import * as express from 'express';
import { register } from '../controllers';
import { validateRegister } from '../middleware/validate';

const app: express.Router = express.Router();

app.post('/register', validateRegister, register);

export default app;