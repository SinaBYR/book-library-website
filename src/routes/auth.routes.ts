import * as express from 'express';
import { register } from '../controllers';

const app: express.Router = express.Router();

app.post('/register', register);

export default app;