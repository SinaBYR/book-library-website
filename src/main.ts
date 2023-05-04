import express, { Express } from 'express';
import path from 'path';
import hbs from 'hbs';
import './index.scss';
import routes from './routes';

hbs.registerPartials(path.resolve(__dirname, '../src/views/partials'));

const app: Express = express();
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../build/public')));
app.set('views', path.join(__dirname, '../src/views'));

app.use(routes);

export default app;