import * as express from 'express';
import { renderHomePage } from '../controllers/pages.controller';

const router = express.Router();

router.get('/', renderHomePage);

export default router;